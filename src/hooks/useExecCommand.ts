import { useState } from "react";
import useAsync from "./useAsync";

const useExecCommand = () => {
  const [command, setCommand] = useState<any | null>(null);
  const { doAsyncOperation } = useAsync();

  const executeCommand = (cmd: string) => {
    const localCommand = { spawn: () => Promise.resolve("PLACEHOLDER") };

    setCommand(localCommand);
    // localCommand.on('close', (data) => {
    //   console.log(`command finished with code ${data.code} and signal ${data.signal}`);
    // });
    // localCommand.on('error', (error) => console.error(`command error: "${error}"`));
    // localCommand.stdout.on('data', (line) => console.log(`command stdout: "${line}"`));
    // localCommand.stderr.on('data', (line) => console.log(`command stderr: "${line}"`));

    return doAsyncOperation(localCommand?.spawn() as Promise<any>);
  };
  const killProcess = () => {
    return command?.emit("close", "closed by the user") || false;
  };

  return {
    executeCommand,
    killProcess,
  };
};

export default useExecCommand;
