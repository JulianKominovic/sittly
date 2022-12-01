import { Button as NextButton, ButtonProps } from "@nextui-org/react";

const Button = (props: ButtonProps) => (
  <NextButton
    css={{
      my: "$4",
      minWidth: "unset",
      "&>span": {
        d: "flex",
        gap: "12px",
        w: "100%",
        alignItems: "center",
      },
      ...props.css,
    }}
    {...props}
  />
);

export default Button;
