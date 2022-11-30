import { Container, Text } from "@nextui-org/react";
import React from "react";
import Checkbox from "./Checkbox";
import InputTemplate, { InputTemplateProps } from "./InputTemplate";

type Props = {
  options: {
    title: string;
    description: string;
    onChecked?: () => void;
  }[];
} & Pick<InputTemplateProps, "id" | "label">;

const InputCheckbox = (props: Props) => {
  const { id, options, label } = props;
  return (
    <Container
      css={{
        display: "flex",
        gap: "$4",
        px: "0",
      }}
    >
      <Text as="label" css={{ w: "100%" }}>
        {label}
      </Text>
      {options.map((item, index) => {
        const uniqueId = id + index + "opt";
        return (
          <Checkbox
            onChecked={item.onChecked}
            uniqueId={uniqueId}
            description={item.description}
            title={item.title}
          />
        );
      })}
    </Container>
  );
};

export default InputCheckbox;
