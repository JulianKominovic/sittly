import React, { useEffect, useMemo, useRef } from "react";
import { KEYS } from "../../lib/keys";
import useQuerybar from "../../hooks/useQuerybar";
import Keystroke from "../../ui/Keystroke";
import { useLocation } from "react-router";
import { INDEX } from "../index";
import { Avatar, Container, Input } from "@nextui-org/react";

const Querybar = () => {
  const { placeholder, setValue, value } = useQuerybar();
  const searchbar = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const icon = useMemo(() => {
    return INDEX.find(({ module: mod }) => mod === location.pathname.slice(1))
      ?.icon;
  }, [location.pathname]);
  useEffect(() => {
    searchbar.current?.focus();
  }, []);
  return (
    <Container
      as="header"
      fluid
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "$4",
        maxW: "none",
        flexWrap: "nowrap",
        px: "$6",
        py: "$6",
      }}
    >
      <Container
        css={{
          maxW: "none",
          display: "flex",
          alignItems: "center",
          gap: "$2",
          mx: "$0",
          p: "0",
        }}
      >
        <Avatar squared icon={icon} />

        <Input
          tabIndex={-1}
          id="query-bar"
          ref={searchbar}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          css={{
            w: "320px",
          }}
          placeholder={placeholder}
          data-navegable="true"
        />
      </Container>
      <Container
        css={{
          maxW: "none",
          display: "flex",
          alignItems: "center",
          gap: "$2",
          mx: "$0",
          p: "0",
          justifyContent: "flex-end",
        }}
      >
        <Container
          as="aside"
          css={{
            maxW: "none",
            display: "flex",
            alignItems: "center",
            gap: "$2",
            mx: "$0",
            p: "0",
            w: "fit-content",
          }}
        >
          <small>Elegir primer resultado/</small>
          <Keystroke id="query-bar-first-result" keys={[KEYS.Enter]} />
        </Container>
        <Container
          as="aside"
          css={{
            maxW: "none",
            display: "flex",
            alignItems: "center",
            gap: "$2",
            mx: "$0",
            p: "0",
            w: "fit-content",
          }}
        >
          <small>Escribir/</small>
          <Keystroke id="search-bar" keys={[KEYS.ControlLeft, KEYS.keyF]} />
        </Container>
      </Container>
    </Container>
  );
};

export default Querybar;
