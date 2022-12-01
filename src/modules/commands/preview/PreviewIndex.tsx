import { Col, Row, Text } from "@nextui-org/react";
import React from "react";
import { VscPreview } from "react-icons/vsc";
import { useParams } from "react-router";
import Preview from ".";
import useDatabase from "../../../hooks/useDatabase";
import useHelper from "../../../hooks/useHelper";
import { CommandStep } from "../create";
import useRunCommand from "../hooks/useRunCommand";
import { CommandsStore } from "../store";

type Props = {};

const PreviewIndex = (props: Props) => {
  const { updateContent, getContent } = useDatabase<CommandsStore>();
  const { id: commandID } = useParams();
  const command = getContent()?.commands.find((cmd) => cmd.id === commandID);
  const { calculatedCommandOutput, testCommand } = useRunCommand({
    externalSteps: command?.steps as CommandStep[],
  });

  const { setHelperOptions } = useHelper(null);

  setHelperOptions([
    {
      title: "Acciones",
      items: [
        {
          title: "Ejecutar comando",
          key: "execute",
          color: "primary",
          textColor: "primary",
          description: "Ejecutar el código",
          icon: <VscPreview />,
          onClick: () => testCommand(),
          children: <></>,
        },
      ],
    },
  ]);

  return (
    <>
      <Row align="center">
        <Text
          h4
          css={{
            m: "0",
            mr: "$4",
            lineHeight: "$2xl",
          }}
        >
          {command?.icon} {command?.title}
        </Text>
        <Text
          css={{
            m: "0",

            color: "$accents5",
          }}
        >
          {command?.id}
        </Text>
      </Row>
      <Preview calculatedCommandOutput={calculatedCommandOutput} />
    </>
  );
};

export default PreviewIndex;
