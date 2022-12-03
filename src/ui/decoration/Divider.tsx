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
    <NextDivider y={1} {...props}>
      {props.label}
    </NextDivider>
  );
};

export default Divider;
