import { ListItemProps } from "../list/ListItem";
import React from "react";
import { Avatar } from "@nextui-org/react";

type ImageIcon = { imageSrc?: string; title?: string };
type ReactComponentIcon = {
  icon: ListItemProps["icon"];
  iconSize: ListItemProps["iconSize"];
  iconColor: ListItemProps["iconColor"];
};
type IconProps = ImageIcon & ReactComponentIcon;
const Icon = (props: IconProps) => {
  return (
    <Avatar
      src={props.imageSrc}
      alt={props.title}
      icon={props.icon}
      size="md"
      css={{
        fontSize: "$2xl",
      }}
      squared
      bordered
      width="40px"
      height="40px"
      loading="lazy"
    />
  );
};
export default Icon;
