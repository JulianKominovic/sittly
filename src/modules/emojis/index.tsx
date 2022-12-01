import React, { useMemo } from "react";
import fuzzysort from "fuzzysort";
import useClipboard from "../../hooks/useClipboard";
import useQuerybar from "../../hooks/useQuerybar";
import { KEYS } from "../../lib/keys";
import { ListItemProps } from "../../ui/list/ListItem";
import VirtualizedList from "../../ui/list/VirtualizedList";
import useHelper from "../../hooks/useHelper";
const emoji = import("unicode-emoji");

const EMOJIS = (await emoji).getEmojis();

const Emojis = () => {
  const { write } = useClipboard();
  const { value } = useQuerybar();
  const { setHelperOptions } = useHelper();

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
  return (
    <VirtualizedList
      list={memoizedEmojis.map(({ obj: item }) => {
        return {
          title: item.description,
          subtitle: item.category,
          icon: item.emoji,
          iconSize: "3xl",
          onFocus() {
            if (item.variations)
              setHelperOptions([
                {
                  title: "Variantes",
                  items: item.variations.map((emoji) => ({
                    icon: emoji.emoji,
                    key: emoji.description,
                    description: emoji.description,
                    children: <></>,
                    title: "Copiar emoji",
                    onClick: () => {
                      write(emoji.emoji);
                    },
                  })),
                },
              ]);
          },
          action: {
            callback() {
              write(item.emoji);
            },
            explanation: "Copiar",
            keys: [KEYS.ControlLeft, KEYS.keyC],
          },
        };
      })}
    />
  );
};

export default Emojis;
