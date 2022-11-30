import { Button as NextButton, ButtonProps } from "@nextui-org/react";

const Button = (props: ButtonProps) => (
  <NextButton
    css={{
      my: "$4",
      minW: "none",
    }}
    {...props}
  />
);

export default Button;
