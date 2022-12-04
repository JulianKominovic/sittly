import {
  styled,
  Divider as NextDivider,
  DividerProps,
} from "@nextui-org/react";

type Props = {
  label: string;
  marginBottom?: number;
  marginTop?: number;
} & Partial<{
  x: number;
  y: number;
  height: number;
  align: "left" | "right" | "start" | "center" | "end";
}> &
  Omit<DividerProps, "height" | "x" | "y" | "align">;

const Divider = (props: Props) => {
  return (
    <NextDivider
      y={0}
      {...props}
      css={{
        mb: `$${props.marginBottom ?? 2}`,
        mt: `$${props.marginTop ?? 2}`,
      }}
    >
      {props.label}
    </NextDivider>
  );
};

export default Divider;
