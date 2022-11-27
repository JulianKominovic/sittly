import React, { useMemo } from "react";
import useExecCommand from "../../../hooks/useExecCommand";
import Button from "../../../ui/button";
import InputTextArea from "../../../ui/form/InputTextArea";
import { CommandStep, PreConditionEnum } from "../create";
import { VscRunAll } from "react-icons/vsc";
import calculateCommandOutput from "../logic/calculateCommandOutput";
import useDatabase from "../../../hooks/useDatabase";
import { useParams } from "react-router";
import { CommandsStore } from "../store";

type Props = {
  steps?: CommandStep[];
};

const Preview = ({ steps: externalSteps }: Props) => {
  const { executeCommand } = useExecCommand();
  const { getContent } = useDatabase<CommandsStore>();
  const { id: commandID } = useParams();

  const steps =
    externalSteps ||
    getContent().commands.find((cmd) => cmd.id === commandID)?.steps;
  const calculatedCommandOutput = useMemo<string>(
    () => calculateCommandOutput(steps!),
    [steps]
  );
  return (
    <>
      <InputTextArea id="preview" readonly value={calculatedCommandOutput} />
      <Button
        onClick={() => executeCommand(calculatedCommandOutput)}
        styles={{
          width: "full",
        }}
      >
        Ejecutar comando <VscRunAll />
      </Button>
    </>
  );
};

export default Preview;
