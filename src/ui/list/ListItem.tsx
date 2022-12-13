import React, { useRef } from "react";
import firstLetterUpperCase from "../../lib/firstLetterUpperCase";
import Keystroke from "../Keystroke";
import { ButtonProps } from "@nextui-org/react";
import { FontSizeType } from "../../types/fontSize";
import Icon from "../decoration/Icon";
import { Button, Container, Text } from "@nextui-org/react";
import { KeyCodes } from "../../types/KeyCodes";

export type Stage = {
  to?: string;
};

export type Action = {
  explanation: string;
  callback: () => void;
  keys: KeyCodes[];
};
export type ListItemProps = {
  id: string;
  title: string;
  largeSize?: "FULL" | "HALF";
  subtitle?: string;
  imageSrc?: string;
  action?: Action;
  alwaysShowKeys?: boolean;
  icon?: React.ReactNode | SVGElement | string;
  iconSize?: FontSizeType;
  onBlur?: (e: HTMLButtonElement) => void;
  onFocus?: (e: HTMLButtonElement) => void;
  ref?: any;
  css?: ButtonProps["css"];
  mx?: number;
};

function ListItem({
  title,
  subtitle,
  imageSrc,
  action,
  icon,
  iconSize = "base",
  alwaysShowKeys,
  onBlur,
  onFocus,
  mx = 0,
  largeSize,
  ...props
}: ListItemProps) {
  const keystrokeRef = useRef<HTMLDivElement | null>(null);

  return (
    <Button
      {...props}
      flat
      css={{
        bg: "$accents0",
        display: "flex",
        w: "100%",
        my: "$4",
        mx: `$${mx}`,
        p: "$2",
        h: "auto",

        ">span": {
          display: "flex",
          w: "100%",
        },
        ".keys-tip": {
          display: alwaysShowKeys ? "flex" : "none",
        },
        "&:focus": {
          ".keys-tip": {
            display: "flex",
          },
        },
        ...props.css,
      }}
      tabIndex={0}
      onFocus={(e) => {
        if (keystrokeRef.current) keystrokeRef.current.style.display = "flex";
        onFocus?.(e.target as HTMLButtonElement);
      }}
      onPress={() => {
        action?.callback?.();
      }}
    >
      <Container
        as="main"
        css={{
          display: "flex",
          alignItems: "center",
          px: "0",
          gap: "$4",
          mx: "0",
          mr: "auto",
        }}
      >
        <Icon imageSrc={imageSrc} title={title} icon={icon} />

        <Container
          as="aside"
          css={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "flex-start",
            justifyItems: "baseline",
            flexWrap: "nowrap",
            mx: "$0",
            px: "0",
            flexDirection: "column",
            width: largeSize === "HALF" ? "50%" : "fit-content",
          }}
        >
          <Text
            small
            css={{
              color: "$accents7",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
              textAlign: "left",
            }}
          >
            {firstLetterUpperCase(subtitle) || "ㅤ"}
          </Text>
          <Text
            weight={"medium"}
            css={{
              lineHeight: "$sm",
              color: "$accents9",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
              textAlign: "left",
            }}
          >
            {firstLetterUpperCase(title)}
          </Text>
        </Container>
      </Container>

      <Container
        as="div"
        css={{
          p: "0",
        }}
        className="keys-tip"
      >
        {action ? (
          <Container
            className="action-keystroke"
            as="aside"
            css={{
              display: "flex",
              alignItems: "center",
              w: "fit-content",
              flexWrap: "nowrap",
              gap: "$2",
              marginRight: "0",
              px: "$4",
            }}
          >
            <small>{action.explanation}/</small>
            <Keystroke id={title} keys={action.keys} />{" "}
          </Container>
        ) : null}
      </Container>
    </Button>
  );
}

export default ListItem;
