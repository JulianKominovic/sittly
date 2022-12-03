import {
  styled,
  Divider as NextDivider,
  DividerProps,
} from "@nextui-org/react";

type Props = { label: string } & Partial<{
  x: number;
  y: number;
  height: number;
  align: "left" | "right" | "start" | "center" | "end";
}> &
  Omit<DividerProps, "height" | "x" | "y" | "align">;

const Divider = (props: Props) => {
  return (
    <NextDivider {...props} y={1}>
      {props.label}
    </NextDivider>
  );
};

export default Divider;
