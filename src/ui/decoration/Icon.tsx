import { ListItemProps } from "../list/ListItem";
import React from "react";
import { Avatar, CSS } from "@nextui-org/react";

type ImageIcon = { imageSrc?: string; title?: string };
type ReactComponentIcon = {
  icon: ListItemProps["icon"];
  iconSize?: ListItemProps["iconSize"] | `${number}px`;
  size?: `${number}px`;
  css?: CSS;
};
type IconProps = ImageIcon & ReactComponentIcon;
const Icon = (props: IconProps) => {
  return (
    <Avatar
      src={props.imageSrc}
      alt={props.title}
      size="md"
      icon={props.icon as any}
      css={{
        fontSize: props.iconSize || "$2xl",
        w: props.size || "40px",
        h: props.size || "40px",
        ...props.css,
      }}
      squared
      bordered
      width={props.size || "40px"}
      height={props.size || "40px"}
      loading="lazy"
    />
  );
};
export default Icon;
