import React, { useEffect, useMemo, useRef } from "react";
import { KEYS } from "../../lib/keys";
import useQuerybar from "../../hooks/useQuerybar";
import Keystroke from "../../ui/Keystroke";
import { useLocation } from "react-router";
import { INDEX } from "../index";
import { Avatar, Container, Input } from "@nextui-org/react";
import InputText from "../../ui/form/InputText";

const Querybar = () => {
  const { placeholder, setValue, value } = useQuerybar();
  const searchbar = useRef<HTMLInputElement>(null);
  const location = useLocation();

  const icon = useMemo(() => {
    return INDEX.find(
      ({ module: mod }) =>
        mod ===
        location.pathname.slice(
          1,
          location.pathname.indexOf("/", 1) === -1
            ? undefined
            : location.pathname.indexOf("/", 1)
        )
    )?.icon;
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

        <InputText
          tabIndex={-1}
          id="query-bar"
          ref={searchbar}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          css={{
            w: "300px",
            my: "0",
            mx: "$4",
            input: {
              fontSize: "$md",
              m: "0",
            },
          }}
          placeholder={placeholder}
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
