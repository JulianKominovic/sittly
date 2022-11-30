import React, { useRef } from "react";
import { Virtuoso } from "react-virtuoso";
// import { motion } from 'framer-motion';
import ListItem, { ListItemProps } from "./ListItem";

type ListProps = {
  list: ListItemProps[];
};

const Row = (_: number, data: ListItemProps) => (
  <ListItem {...data} css={{ mx: "$4", w: "calc(100% - ($4 * 2))" }} />
);

type VirtuosoRef = HTMLElement & {
  scrollToIndex: ({ index, align }: { index: number; align: "center" }) => void;
};
const List = ({ list }: ListProps) => {
  const virtuosoRef = useRef<VirtuosoRef | undefined>(undefined);
  if (virtuosoRef.current !== null) {
    virtuosoRef.current?.scrollToIndex({
      index: 0,
      align: "center",
    });
  }

  return (
    <Virtuoso
      react18ConcurrentRendering
      tabIndex={-1}
      style={{
        height: 300,
        width: "100%",
      }}
      totalCount={list.length}
      data={list}
      ref={virtuosoRef as any}
      itemContent={Row}
    />
  );
};

const MemoizedList = React.memo(List, ({ list }, { list: newList }) => {
  return (
    list.length === newList.length &&
    list.every((item, index) => item === newList.at(index))
  );
});

export default MemoizedList;
