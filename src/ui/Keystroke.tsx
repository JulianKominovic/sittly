import { Container } from "@nextui-org/react";
import React from "react";
import { KEYS } from "../lib/keys";

export type TypeKeystroke = {
  id: string;
  keys: KEYS[];
  size?: "sm" | "xs" | "xxs";
  rounded?: boolean;
};

function Keystroke({ id, keys, size = "sm", rounded }: TypeKeystroke) {
  return (
    <Container
      css={{
        display: "flex",
        alignItems: "center",
        w: "fit-content",
        mx: "$0",
        p: "$0",
      }}
    >
      {keys.map((key, index) => (
        <kbd
          id={id + index + key}
          data-highlight-key={key}
          className={`${
            size === "xxs" ? "text-[12px]" : `text-${size}`
          } font-sans`}
        >
          {key}
        </kbd>
      ))}
    </Container>
  );
}

export default Keystroke;
