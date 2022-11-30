import { Container, Dropdown, Text } from "@nextui-org/react";
import React, { useRef, useState } from "react";
import { IoReturnDownBack, IoReturnDownForward } from "react-icons/io5";
import { useNavigate } from "react-router";
import { KEYS } from "../../lib/keys";
import { HelperAction, useHelper } from "../../store/helperStore";

// import { motion } from 'framer-motion';

import Keystroke from "../../ui/Keystroke";
import List from "../../ui/list";

const Helper = () => {
  const isHelperOpen = useHelper((state) => state.isHelperOpen);
  const setHelperOpen = useHelper((state) => state.setHelperOpen);
  const options = useHelper((state) => state.options);
  const navigation = useNavigate();

  return (
    <Dropdown
      placement="top-right"
      shouldCloseOnBlur
      isBordered
      isOpen={isHelperOpen}
      onOpenChange={setHelperOpen}
      borderWeight={"light"}
      closeOnSelect
      offset={4}
    >
      <Dropdown.Button
        id="button-helper-trigger"
        flat
        css={{
          bg: "transparent",
          color: "$accents9",
          display: "flex",
          alignItems: "center",
          mx: "0",
          w: "fit-content",
          px: "$4",
        }}
        icon={<></>}
      >
        <small className="text-xs">Más acciones/</small>
        <Keystroke keys={[KEYS.ControlLeft, KEYS.keyO]} id="helper-firing" />
      </Dropdown.Button>
      <Dropdown.Menu
        variant="flat"
        color="secondary"
        aria-label="Avatar Actions"
        css={{
          maxH: "200px",
          mb: "$14",
        }}
        onAction={(key) => {
          let result: undefined | (() => void) = undefined;
          if (key === "go-back")
            return navigation("../", {
              relative: "path",
            });

          if (key === "go-forward") return (window as any).navigation.back();
          options.find((section) => {
            return section.items.some((item) => {
              if (item.key === key) {
                result = item.onClick;
                return true;
              }
            });
          });
          if (result) result();
        }}
      >
        {
          options?.map(({ title, items }) => (
            <Dropdown.Section title={title}>
              {items.map((item) => (
                <Dropdown.Item {...item}>{item.children}</Dropdown.Item>
              ))}
            </Dropdown.Section>
          )) as any
        }
        <Dropdown.Section title="Navegación">
          <Dropdown.Item
            key="go-back"
            command="Esc"
            description="Ir hacia atras"
            icon={<IoReturnDownBack />}
          >
            Volver
          </Dropdown.Item>
          <Dropdown.Item
            key="go-forward"
            command="⌘N"
            description="Ir hacia adelante"
            icon={<IoReturnDownForward />}
          >
            Avanzar
          </Dropdown.Item>
        </Dropdown.Section>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Helper;
