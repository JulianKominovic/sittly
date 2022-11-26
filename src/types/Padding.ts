import { Spacing } from "./Spacing";

export type Padding =
  | `px-${Spacing}`
  | `py-${Spacing}`
  | `pt-${Spacing}`
  | `pb-${Spacing}`
  | `pl-${Spacing}`
  | `pr-${Spacing}`;
