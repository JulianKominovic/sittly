import { Container, Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import InputTemplate, { InputTemplateProps } from "./InputTemplate";

type Props = {
  defaultOption?: number;
  options: {
    title: string;
    description: string;
    onChecked?: () => void;
  }[];
} & Pick<InputTemplateProps, "id" | "label">;

const InputRadio = (props: Props) => {
  const { id, options, defaultOption, label } = props;
  const [checked, setChecked] = useState(defaultOption ?? -1);
  return (
    <Container
      css={{
        display: "flex",
        flexDirection: "column",
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
            key={uniqueId}
            onChecked={item.onChecked}
            uniqueId={uniqueId}
            description={item.description}
            title={item.title}
            checked={checked}
            setChecked={setChecked}
            index={index}
            rounded
          />
        );
      })}
    </Container>
  );
};

export default InputRadio;
