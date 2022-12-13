import { Container, CSS } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import Divider from "../decoration/Divider";
import ListItem, { Action, ListItemProps } from "./ListItem";

type Divider = {
  divider: true;
  label: string;
  y: number;
  marginTop?: number;
  marginBottom?: number;
};
export type ListItem = ((ListItemProps & { divider: false }) | Divider) & {
  id: string;
};
type ListProps = {
  list: ListItem[];
  css?: CSS;
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
const List = ({ list, css }: ListProps) => {
  const virtuosoRef = useRef<VirtuosoRef | undefined>(undefined);
  const [heightOffset, setHeightOffset] = useState(0);
  if (virtuosoRef.current !== null) {
    virtuosoRef.current?.scrollToIndex({
      index: 0,
      align: "center",
    });
  }
  useEffect(() => {
    console.log(
      document.querySelector(".virtualized-list")?.getBoundingClientRect()
    );
    setHeightOffset(
      document.querySelector(".virtualized-list")?.getBoundingClientRect().top -
        40
    );
  }, []);
  return (
    <Container
      className="virtualized-list"
      css={{
        m: "0",
        p: "0",
        "[data-virtuoso-scroller='true']": {
          position: "sticky",
        },
        "[data-test-id='virtuoso-item-list']": {
          ">*": {
            mx: "$2",
          },
        },
        ...css,
      }}
    >
      <Virtuoso
        react18ConcurrentRendering
        tabIndex={-1}
        style={{
          height: 420 - heightOffset,
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
  const conditions =
    list.length === newList.length &&
    list.every((item, index) => {
      return item.id === newList[index].id;
    });
  return conditions;
});

export default MemoizedList;
