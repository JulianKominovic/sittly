import { ListItemProps } from "../list/ListItem";
import React from "react";

const renderIcon = (
  icon: ListItemProps["icon"],
  iconSize: ListItemProps["iconSize"],
  iconColor: ListItemProps["iconColor"]
) => {
  if (typeof icon === "string")
    return <p className={`shadow-sm text-${iconSize}`}>{icon}</p>;
  return (
    React.cloneElement(icon, {
      className:
        "w-9 h-9 text-color-light p-1 rounded-md text-color-opaque text-shadow-sm shadow-sm bg-gradient-to-tr from-cyan-400 to-purple-400",
    }) || null
  );
};
type ImageIcon = { imageSrc?: string; title?: string };
type ReactComponentIcon = {
  icon: ListItemProps["icon"];
  iconSize: ListItemProps["iconSize"];
  iconColor: ListItemProps["iconColor"];
};
type IconProps = ImageIcon & ReactComponentIcon;
const Icon = (props: IconProps) => {
  if (props.imageSrc && props.title)
    return (
      <img
        className="text-color-light p-1 rounded-md"
        src={props.imageSrc}
        alt={props.title}
        width="32px"
        height="32px"
        loading="lazy"
      />
    );
  if (props.icon && props.iconSize)
    return renderIcon(props.icon, props.iconSize, props.iconColor);
  return null;
};
export default Icon;
