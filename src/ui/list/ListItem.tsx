import React, { useRef, useState } from "react";

// import { motion } from 'framer-motion';
import firstLetterUpperCase from "../../lib/firstLetterUpperCase";
import { KEYS } from "../../lib/keys";
import Keystroke from "../Keystroke";
import { ButtonProps } from "@nextui-org/react";
import { HelperAction, useHelper } from "../../store/helperStore";
import { FontSizeType } from "../../types/fontSize";
import Icon from "../decoration/Icon";
import { TailwindColors } from "../../enum/TailwindColors";
import { Button, Container, Text } from "@nextui-org/react";

export type Stage = {
  to?: string;
};

export type Action = {
  explanation: string;
  callback: (objectProps: ListItemProps) => void;
  keys: KEYS[];
};
export type ListItemProps = {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  action?: Action;
  alwaysShowKeys?: boolean;
  helperActions?: HelperAction[];

  icon?: React.ReactNode | SVGElement | string;
  iconSize?: FontSizeType;
  iconColor?: TailwindColors;
  onBlur?: (e: HTMLButtonElement) => void;
  onFocus?: (e: HTMLButtonElement) => void;
  ref?: any;
  css?: ButtonProps["css"];
};

function ListItem({
  title,
  subtitle,
  imageSrc,
  action,
  icon,
  iconSize = "base",
  helperActions,
  alwaysShowKeys,
  onBlur,
  onFocus,
  iconColor,
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
        onFocus?.(e.target);
      }}
      onPress={() => {
        action?.callback?.(props);
      }}
    >
      <Container
        as="main"
        css={{
          display: "flex",
          alignItems: "center",
          px: "0",
        }}
      >
        <Icon
          iconColor={iconColor}
          imageSrc={imageSrc}
          title={title}
          icon={icon}
          iconSize={iconSize}
        />

        <Container
          as="aside"
          css={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "flex-start",
            justifyItems: "baseline",
            w: "fit-content",
            flexWrap: "nowrap",
            mx: "$0",
            flexDirection: "column",
          }}
        >
          <Text
            small
            css={{
              color: "$accents7",
            }}
          >
            {firstLetterUpperCase(subtitle) || "ㅤ"}
          </Text>
          <Text
            weight={"medium"}
            css={{
              lineHeight: "$sm",
              color: "$accents9",
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
