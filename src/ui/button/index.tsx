import React, { ButtonHTMLAttributes } from "react";
import { Margin } from "../../types/Margin";
import { Padding } from "../../types/Padding";
import { focusedClasses } from "../styles";
import { Colors } from "../../types/Colors";
import { Size } from "../../types/Size";
import { rescueScrollIntoView } from "../utils/rescueScrollIntoView";
type Props = {
  variant?: "filled" | "outlined";
  color?: Colors;
  styles?: {
    width?: Size;
    height?: Size;
    padding?: Padding;
    margin?: Margin;
  };
  children?: any;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const buildClasses = (props: Props) =>
  `${focusedClasses(props?.color)} focus:border-${
    props?.color
  }-300 rounded-lg px-4 py-1 border-${
    props.color + "-900" || "transparent"
  } bg-${props.color + "-900" || "transparent"} text-${
    props.color
  }-900 focus:text-${props.color}-300 w-${props.styles?.width} h-${
    props.styles?.height
  } ${
    props.styles?.margin
  } bg-opacity-20 active:bg-black active:scale-95 transition-transform flex gap-2 justify-center items-center`;

const Button = ({ variant = "outlined", ...props }: Props) => {
  if (variant === "outlined")
    return (
      <button
        className={`h-[34px] ${buildClasses(props)}`}
        {...props}
        onClick={(e) => {
          rescueScrollIntoView(e.target);
          props?.onClick?.(e);
        }}
      >
        {props.children}
      </button>
    );
  return (
    <button
      className={`h-[34px] ${buildClasses(props)}`}
      {...props}
      onClick={(e) => {
        rescueScrollIntoView(e.target);
        props?.onClick?.(e);
      }}
    >
      {props.children}
    </button>
  );
};

export default Button;
