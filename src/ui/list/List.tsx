import React from "react";

const List = ({
  children,
  ...props
}: {
  children: React.ReactNode[] | React.ReactNode;
  props?: any;
}) => {
  return <div {...props}>{children}</div>;
};

export default List;
