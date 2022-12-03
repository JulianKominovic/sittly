import { Container, Text } from "@nextui-org/react";
import React, { useMemo, useRef, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { BsCheck, BsPlus } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

import Button from "../button";
import InputText from "./InputText";

type OptionType = { label: string; value: string; onClick: () => void };
type Props = {
  options: OptionType[];
  label: string;
  noResult?: {
    should: "DO_NOTHING" | "ADD_OPTION";
    /**
     * If `should` is set to `ADD_OPTION` this callback will be fired
     */
    pushNewOption: (newOptionValue: string) => void;
  };
};

const INITIAL_SEARCH = "Seleccionar o buscar...";

const NO_RESULT_DEFAULT_COMPONENT = <Text>No hay resultados</Text>;
const NO_RESULT_ADD_OPTION_COMPONENT = ({ value }: { value: string }) => (
  <Text css={{ d: "flex", alignItems: "center" }}>
    <BsPlus /> Agregar '{value}'
  </Text>
);

const InputSelect = ({ noResult, options, label }: Props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<null | string>(null);

  const inputRef = useRef<null | HTMLInputElement>(null);

  const filteredOptions = useMemo(
    () => options.filter((opt) => new RegExp(search, "i").test(opt.value)),
    [search]
  );

  return (
    <Container
      css={{
        m: "0",
        p: "0",
        mb: "$10",
        "span:has(.left)": {
          position: "absolute",
          left: 0,
          top: 0,
        },
        "span:has(.right)": {
          position: "absolute",
          right: 0,
          top: 0,
        },
      }}
    >
      <InputText
        label={label}
        ref={inputRef}
        css={{
          bg: "transparent",
          m: "0",
          position: "relative",
          input: {
            px: "$10",
          },
        }}
        value={search}
        placeholder={INITIAL_SEARCH}
        onChange={({ target }) => {
          setSearch(target.value);
          setOpen(true);
        }}
        tabIndex={1}
        contentLeft={<FiSearch className="left" />}
        contentRight={<AiFillCaretDown className="right" />}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            setOpen((prev) => !prev);
          }
        }}
        onClick={() => setOpen((prev) => !prev)}
      />
      <Container
        data-state={open ? "OPEN" : "CLOSE"}
        css={{
          m: "0",
          p: "0",
          py: "$4",
          mt: "$2",
          borderRadius: "$lg",
          bg: "$accents0",
          transitionProperty: "opacity, scale",
          "&[data-state='OPEN']": {
            opacity: 1,
            scale: 1,
            display: "block",
          },
          "&[data-state='CLOSE']": {
            opacity: 0,
            scale: 0,
            display: "none",
          },
        }}
      >
        {filteredOptions.length > 0 ? (
          filteredOptions.map(({ label, value }) => (
            <Button
              onKeyUp={(e) => {
                if (e.code === "ArrowDown" || e.code === "ArrowUp") return;
                if (e.code === "Enter") {
                  setSelected(value);
                  setSearch(value);
                  inputRef.current?.focus();
                  inputRef.current?.scrollIntoView({
                    block: "center",
                    inline: "center",
                  });
                  return setOpen(false);
                }
                if (open) {
                  e.preventDefault();
                  inputRef.current?.focus();
                }
              }}
              tabIndex={1}
              css={{
                bg: "$accents0",
                w: "100%",
                minWidth: "unset",
                transform: "scale(1)!important",
                px: "$10",
                color: "$accents9",
                span: {
                  d: "grid!important",
                  w: "100%",
                  gap: "$4",
                  gridTemplateColumns: "1fr 20px",
                },
                "&:focus": {
                  boxShadow:
                    "0 0 0 2px var(--nextui-colors-background), 0 0 0 2px var(--nextui-colors-primary) inset",
                },
              }}
              className="react-select__option"
              onClick={(e) => {
                setSelected(value);
                setSearch(value);
                setOpen(false);
                inputRef.current?.focus();
              }}
            >
              {label} {selected === value ? <BsCheck /> : null}
            </Button>
          ))
        ) : (
          <Button
            css={{
              bg: "$accents0",
              w: "100%",
              minWidth: "unset",
              px: "$10",

              "&:focus": {
                boxShadow:
                  "0 0 0 2px var(--nextui-colors-background), 0 0 0 2px var(--nextui-colors-primary) inset",
              },
            }}
            onKeyUp={(e) => {
              if (e.code === "ArrowDown" || e.code === "ArrowUp") return;
              if (noResult?.should === "DO_NOTHING") return;
              if (e.code === "Enter") {
                setSelected(search);
                noResult?.pushNewOption(search);
                inputRef.current?.focus();
                inputRef.current?.scrollIntoView({
                  block: "center",
                  inline: "center",
                });
                return setOpen(false);
              }
              if (open) {
                e.preventDefault();
                inputRef.current?.focus();
                inputRef.current?.scrollIntoView({
                  block: "center",
                  inline: "center",
                });
              }
            }}
            className="react-select__option"
          >
            {noResult?.should === "DO_NOTHING" ? (
              NO_RESULT_DEFAULT_COMPONENT
            ) : (
              <NO_RESULT_ADD_OPTION_COMPONENT value={search} />
            )}
          </Button>
        )}
      </Container>
    </Container>
  );
};

export default InputSelect;
