import { borderClasses, focusedClasses } from "../styles";

const borderColor = (hasErrors: boolean) => {
  if (hasErrors) {
    return `focus:border-red-400 border-red-400`;
  }
  return focusedClasses();
};
export const InputStyles = (hasErrors: boolean) =>
  `background-secondary rounded-lg leading-relaxed py-1 px-2 focus:outline-none border ${borderColor(
    hasErrors
  )} ${hasErrors ? "animate-shakeX" : ""} ${borderClasses}`;
