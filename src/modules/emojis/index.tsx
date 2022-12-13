import React, { useMemo } from "react";
import fuzzysort from "fuzzysort";
import useClipboard from "../../hooks/useClipboard";
import useQuerybar from "../../hooks/useQuerybar";
import { KEYS } from "../../lib/keys";
import VirtualizedList from "../../ui/list/VirtualizedList";
import useHelper from "../../hooks/useHelper";
import { VscMultipleWindows } from "react-icons/vsc";
import { HelperAction } from "../../store/helperStore";
import useDatabase from "../../hooks/useDatabase";
import { FrecuentEmoji } from "./types";
import { BaseEmoji } from "unicode-emoji";
import * as emoji from "unicode-emoji";
import { FiCopy } from "react-icons/fi";
import SidebarDetailsLayout from "../../ui/sidebar-details/SidebarDetails";
import { ListItemProps } from "../../ui/list/ListItem";
const EMOJIS = emoji.getEmojis();

const Emojis = () => {
  const { write, pasteToCurrentWindow } = useClipboard();
  const { value } = useQuerybar();
  const { setHelperOptions } = useHelper(null);
  const { database, updateContent } = useDatabase<FrecuentEmoji[]>([]);
  const [previewEmoji, setPreviewEmoji] = React.useState<BaseEmoji | null>(
    null
  );

  const memoizedEmojis = useMemo(() => {
    if (!value)
      return EMOJIS.map((em) => ({
        obj: em,
      }));

    return fuzzysort.go(value, EMOJIS, {
      limit: 100,
      keys: ["description"],
    });
  }, [value]);

  const setEmojiFrecuency = (item: BaseEmoji) => {
    updateContent((prev) => {
      if (!prev)
        return [
          {
            emoji: item.emoji,
            category: item.category,
            description: item.description,
            numberOfTimesUsed: 1,
          },
        ];
      const foundIndex = prev.findIndex((em) => em.emoji === item.emoji);

      if (foundIndex !== -1) {
        return prev.map((em, index) => {
          if (index === foundIndex) {
            return {
              ...em,
              numberOfTimesUsed: em.numberOfTimesUsed + 1,
            };
          }
          return em;
        });
      } else {
        return [
          ...prev,
          {
            emoji: item.emoji,
            category: item.category,
            description: item.description,
            numberOfTimesUsed: 1,
          },
        ];
      }
    });
  };

  const emojiRenderer = (
    item: {
      emoji: BaseEmoji["emoji"];
      description: BaseEmoji["description"];
      category: BaseEmoji["category"];
      numberOfTimesUsed?: number;
      variations: BaseEmoji[];
    },
    index: number
  ): ListItemProps => {
    return {
      divider: false,
      title: item.description,
      subtitle: item.category,
      icon: item.emoji,
      iconSize: "3xl",
      largeSize: "HALF",
      id: index + "emoji",
      numberOfTimesUsed: (item as any).numberOfTimesUsed ?? 0,
      onFocus() {
        const alwaysHelperOptions: HelperAction[0] = {
          title: "Acciones",
          items: [
            {
              icon: <FiCopy />,
              key: "copy",
              textColor: "secondary",
              color: "secondary",
              description: "Copiar emoji en el portapapeles.",
              title: "Copiar emoji",
              onClick: () => {
                setEmojiFrecuency(item);

                write(item.emoji);
              },
            },
            {
              icon: <VscMultipleWindows />,
              key: "copy-to-window",
              textColor: "success",
              color: "success",
              description: "Pega este emoji en donde estés",
              title: "Pegar emoji en la ventana actual",
              onClick: () => {
                setEmojiFrecuency(item);

                pasteToCurrentWindow(item.emoji);
              },
            },
          ],
        };

        if (item.variations) {
          setHelperOptions([
            alwaysHelperOptions,
            {
              title: "Variantes",
              items: item.variations.map((emoji) => ({
                icon: emoji.emoji,
                key: emoji.description,
                description: emoji.description,
                children: <></>,
                title: "Copiar emoji",
                onClick: () => {
                  const found =
                    database.findIndex((em) => em.emoji === item.emoji) !== -1;
                  found ? database.map((el) => el.emoji) : write(emoji.emoji);
                },
              })),
            },
          ]);
        } else {
          setHelperOptions([alwaysHelperOptions]);
        }

        setPreviewEmoji(item);
      },
      action: {
        callback() {
          setEmojiFrecuency(item);
          pasteToCurrentWindow(item.emoji);
        },
        explanation: "Pegar en la ventana actual",
        keys: [KEYS.Enter],
      },
    };
  };

  return (
    <SidebarDetailsLayout
      icon={previewEmoji?.emoji}
      table={{
        id: "emoji-preview",
        columns: ["Key", "Value"],
        rows: [
          ["Emoji", previewEmoji?.emoji],
          ["Description", previewEmoji?.description],
          ["Category", previewEmoji?.category],
          ["Subgrupo", previewEmoji?.subgroup],
        ],
      }}
    >
      <VirtualizedList
        list={
          [
            ...(database?.length > 0 &&
            database?.filter((em) => em.description.includes(value))?.length > 0
              ? [
                  {
                    id: "div-frec",
                    divider: true,
                    label: "Frecuentes",
                    marginTop: 4,
                    marginBottom: 8,
                  },
                ]
              : []),
            ...database
              .filter((em) => em.description.includes(value))
              .map((em, index) => {
                return emojiRenderer(em as any, index);
              })
              .sort((a, b) => b.numberOfTimesUsed - a.numberOfTimesUsed),
            ...(memoizedEmojis.length > 0
              ? [
                  {
                    id: "div-emojis",
                    divider: true,
                    label: "Emojis",
                    marginTop: 8,
                    marginBottom: 8,
                  },
                ]
              : []),
            ...memoizedEmojis.map(({ obj: item }, index) => {
              return emojiRenderer(item as any, index);
            }),
          ] as any
        }
      />
    </SidebarDetailsLayout>
  );
};

export default Emojis;
