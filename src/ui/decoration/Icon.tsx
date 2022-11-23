import { ListItemProps } from '../list/ListItem';
import React from 'react';

const renderIcon = (icon: ListItemProps['icon'], iconSize: ListItemProps['iconSize']) => {
  if (typeof icon === 'string') return <p className={`shadow-sm text-${iconSize}`}>{icon}</p>;
  return (
    React.cloneElement(icon, {
      className: 'conic-gradient w-9 h-9 text-gray-50 p-1 rounded-md text-gray-900 text-shadow-sm shadow-sm'
    }) || null
  );
};
type ImageIcon = { imageSrc?: string; title?: string };
type ReactComponentIcon = {
  icon: ListItemProps['icon'];
  iconSize: ListItemProps['iconSize'];
};
type IconProps = ImageIcon & ReactComponentIcon;
const Icon = (props: IconProps) => {
  if (props.imageSrc && props.title)
    return (
      <img
        className="conic-gradient text-gray-50 p-1 rounded-md"
        src={props.imageSrc}
        alt={props.title}
        width="32px"
        height="32px"
        loading="lazy"
      />
    );
  if (props.icon && props.iconSize) return renderIcon(props.icon, props.iconSize);
  return null;
};
export default Icon;
