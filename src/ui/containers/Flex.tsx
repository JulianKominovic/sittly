import { motion } from "framer-motion";
import React from "react";

type Props = {
  styles?: {
    gap?: `gap-${keyof DefaultTheme["spacing"]}`;
    direction?: "flex-col" | "flex-col-reverse" | "flex-row-reverse";
    justifyContent?:
      | "justify-start"
      | "justify-end"
      | "justify-center"
      | "justify-between"
      | "justify-around"
      | "justify-evenly";
    alignItems?: "items-start" | "items-end" | "items-center";
    width?: `w-${keyof DefaultTheme["spacing"] & DefaultTheme["minWidth"]}`;
    height?: `h-${keyof DefaultTheme["spacing"] & DefaultTheme["minHeight"]}`;
  };
  children: React.ReactNode;
};

const Flex = ({
  children,
  styles: { alignItems, justifyContent, gap, direction, width, height } = {},
  ...props
}: Props) => {
  return (
    <motion.div
      className={`flex ${alignItems || "items-start"} ${
        justifyContent || "justify-start"
      } ${direction || "flex-row"} ${gap || "gap-1"} ${width || "w-full"} ${
        height || "h-full"
      }`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Flex;
