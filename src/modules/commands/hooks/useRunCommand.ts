import React, { useMemo } from "react";
import { useParams } from "react-router";
import useDatabase from "../../../hooks/useDatabase";
import useExecCommand from "../../../hooks/useExecCommand";
import { CommandStep } from "../create";
import calculateCommandOutput from "../logic/calculateCommandOutput";
import { CommandsStore } from "../store";

const useRunCommand = ({ externalSteps }: { externalSteps: CommandStep[] }) => {
  const { database } = useDatabase<CommandsStore>();
  const { id: commandID } = useParams();

  const { executeCommand } = useExecCommand();
  const steps =
    externalSteps ||
    database.commands.find((cmd) => cmd.id === commandID)?.steps;
  const calculatedCommandOutput = useMemo<string>(
    () => calculateCommandOutput(steps!),
    [steps]
  );
  return {
    testCommand: () => executeCommand(calculatedCommandOutput),
    calculatedCommandOutput,
  };
};

export default useRunCommand;
