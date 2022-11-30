import { styled } from "@nextui-org/react";
import React from "react";

type Props = {
  styles?: {
    marginTop?: number;
    marginBottom?: number;
  };
  label: string;
};

const DividerStyled = styled("div", {
  "::after": {
    border: "1px solid $accents2",
    content: "",
    w: "100%",
    display: "block",
    h: "1px",
  },
  w: "100%",
  pr: "8",
  d: "flex",
  alignItems: "center",
  whiteSpace: "pre",
});

const Divider = ({
  styles: { marginTop, marginBottom } = {},
  label,
}: Props) => {
  return (
    <DividerStyled
      css={{ mb: `${marginBottom}px`, mt: `${marginTop}px` }}
      className={`${marginTop || ""} ${marginBottom || ""}
      
      after:border after:border-color-normal text-color-light text-sm after:ml-2 after:w-full after:block flex gap-3 after:h-px w-full pr-4 items-center whitespace-pre focus:text-color-normal focus:after:border-color-normal focus:outline-none`}
    >
      {label}
    </DividerStyled>
  );
};

export default Divider;
