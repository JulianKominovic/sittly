import { Container, styled } from "@nextui-org/react";
import React from "react";
import { KEYS } from "../lib/keys";

export type TypeKeystroke = {
  id: string;
  keys: KEYS[];
  size?: "sm" | "xs" | "xxs";
  rounded?: boolean;
};

const KBD = styled("kbd", {
  borderBlockEnd: "2px solid $accents5",
});

function Keystroke({ id, keys, size = "sm", rounded }: TypeKeystroke) {
  return (
    <Container
      css={{
        display: "flex",
        alignItems: "center",
        w: "fit-content",
        mx: "$2",
        p: "$0",
      }}
    >
      {keys.map((key, index) => (
        <KBD id={id + index + key} data-highlight-key={key}>
          {key}
        </KBD>
      ))}
    </Container>
  );
}

export default Keystroke;
