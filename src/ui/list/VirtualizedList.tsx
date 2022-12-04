import { Container } from "@nextui-org/react";
import React, { useRef } from "react";
import { Virtuoso } from "react-virtuoso";
import Divider from "../decoration/Divider";
import ListItem, { ListItemProps } from "./ListItem";

type Divider = {
  divider: true;
  label: string;
  y: number;
  marginTop?: number;
  marginBottom?: number;
};
type ListItem = ListItemProps | Divider;
type ListProps = {
  list: ListItem[];
};

const Row = (_: number, data: ListItem) =>
  (data as any)?.divider ? (
    <Divider {...(data as Divider)} />
  ) : (
    <ListItem {...(data as ListItemProps)} mx={0} />
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
    <Container
      css={{
        m: "0",
        p: "0",
        "[data-test-id='virtuoso-item-list']": {
          ">*": {
            mx: "$2",
          },
        },
      }}
    >
      <Virtuoso
        react18ConcurrentRendering
        tabIndex={-1}
        style={{
          height: 284,
          width: "100%",
        }}
        totalCount={list.length}
        data={list}
        ref={virtuosoRef as any}
        itemContent={Row}
      />
    </Container>
  );
};

const MemoizedList = React.memo(List, ({ list }, { list: newList }) => {
  return (
    list.length === newList.length &&
    list.every((item, index) => item === newList.at(index))
  );
});

export default MemoizedList;
