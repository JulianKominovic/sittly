export const focusedClasses = (color = "gray") =>
  color
    ? `border focus:border-${color}-300`
    : `border focus:border-color-opaque`;
export const hoverClasses = () => "hover:border-color-opaque";
export const borderClasses = `border border-color-opaque`;
