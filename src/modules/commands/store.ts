import { CommandStep } from "./create";

export type Command = {
  title: string;
  subtitle: string;
  id: string;
  steps: CommandStep[];
  icon: string;
};
export type CommandsStore = {
  commands: Command[];
};
