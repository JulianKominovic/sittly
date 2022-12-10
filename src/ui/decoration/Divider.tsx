import {
  styled,
  Divider as NextDivider,
  DividerProps,
  Container,
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
    <Container
      y={0}
      {...props}
      css={{
        m: "0",
        p: "0",
        mb: `$${props.marginBottom ?? 2}`,
        mt: `$${props.marginTop ?? 2}`,
        color: "$accents5",
        d: "flex",
        alignItems: "center",
        flexWrap: "nowrap",
        gap: "$10",
        whiteSpace: "pre",
        "&::after": {
          height: "1px",
          content: "",
          width: "100%",
          display: "inline-block",
          bg: "$accents1",
        },
      }}
    >
      {props.label}
    </Container>
  );
};

export default Divider;
