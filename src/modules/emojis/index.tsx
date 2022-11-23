import React, { useMemo } from "react";
import fuzzysort from "fuzzysort";
import useClipboard from "../../hooks/useClipboard";
import useQuerybar from "../../hooks/useQuerybar";
import { KEYS } from "../../lib/keys";
import { ListItemProps } from "../../ui/list/ListItem";
import VirtualizedList from "../../ui/list/VirtualizedList";
const emoji = import("unicode-emoji");

const EMOJIS = (await emoji).getEmojis();

const Emojis = () => {
  const { write } = useClipboard();
  const { value } = useQuerybar();

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
        const helperActions: ListItemProps["helperActions"] | undefined =
          item.variations?.map((variation) => ({
            icon: variation.emoji,
            callback: () => {
              write(variation.emoji);
            },
            iconSize: "3xl",
            explanation: "Copiar",
            keys: [KEYS.Enter],
            subtitle: "Copiar este emoji",
            title: variation.description,
          }));
        return {
          title: item.description,
          subtitle: item.category,
          icon: item.emoji,
          iconSize: "3xl",
          action: {
            callback() {
              write(item.emoji);
            },
            explanation: "Copiar",
            keys: [KEYS.ControlLeft, KEYS.keyC],
          },
          helperActions,
        };
      })}
    />
  );
};

export default Emojis;
