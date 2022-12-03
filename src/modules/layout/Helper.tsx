import { changeTheme, Dropdown, useTheme } from "@nextui-org/react";
import { useEffect } from "react";
import {
  IoMoon,
  IoReturnDownBack,
  IoReturnDownForward,
  IoSunny,
} from "react-icons/io5";
import { useNavigate } from "react-router";
import { KEYS } from "../../lib/keys";
import { useHelper } from "../../store/helperStore";
import { KeyCodeToVisualKey } from "../../types/KeyCodes";
import Keystroke from "../../ui/Keystroke";

const Helper = () => {
  const isHelperOpen = useHelper((state) => state.isHelperOpen);
  const setHelperOpen = useHelper((state) => state.setHelperOpen);
  const options = useHelper((state) => state.options);
  const navigation = useNavigate();
  const { isDark } = useTheme();

  console.log(isHelperOpen);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!options || options.length < 1) return;

      options.forEach((opt) => {
        if (!opt.items) return;

        opt.items.forEach((op) => {
          if (!op.keyboardShorcut) return;
          if (
            op.keyboardShorcut.every((key) => {
              if (key === "ControlLeft" && e.ctrlKey) return true;
              if (key === "AltLeft" && e.altKey) return true;

              return key === e.code;
            })
          ) {
            e.preventDefault();
            op.onClick();
            return;
          }
        });
      });
    };
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [options]);

  return (
    <Dropdown
      placement="top-right"
      shouldCloseOnBlur
      isBordered
      isOpen={isHelperOpen}
      onOpenChange={setHelperOpen}
      defaultOpen
      borderWeight={"light"}
      closeOnSelect
      offset={4}
    >
      <Dropdown.Button
        id="button-helper-trigger"
        flat
        tabIndex={-1}
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
          pb: "$14",
          "[aria-label='nav-buttons-container']": {
            paddingBlockEnd: "$4",
          },
        }}
        onAction={(key) => {
          let result: undefined | (() => void) = undefined;
          if (key === "go-back")
            return navigation("../", {
              relative: "path",
            });

          if (key === "go-forward") return (window as any).navigation.back();
          if (key === "change-theme")
            return changeTheme(isDark ? "light" : "dark");

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
          options?.map(({ title, items }, index) => (
            <Dropdown.Section title={title} key={"hpr" + index + title}>
              {items.map((item) => (
                <Dropdown.Item
                  {...item}
                  css={{
                    my: "$4",
                    ...item.css,
                  }}
                  command={item.keyboardShorcut
                    ?.map((k) => KeyCodeToVisualKey[k])
                    .join(" ")}
                >
                  {item.children}
                </Dropdown.Item>
              ))}
            </Dropdown.Section>
          )) as any
        }
        <Dropdown.Section title="Navegación">
          <Dropdown.Item
            css={{
              my: "$4",
            }}
            key="go-back"
            command="Esc"
            description="Ir hacia atras"
            icon={<IoReturnDownBack />}
          >
            Volver
          </Dropdown.Item>
          <Dropdown.Item
            css={{
              my: "$4",
            }}
            key="go-forward"
            description="Ir hacia adelante"
            icon={<IoReturnDownForward />}
          >
            Avanzar
          </Dropdown.Item>
        </Dropdown.Section>
        <Dropdown.Section title="Ajustes" aria-label="nav-buttons-container">
          <Dropdown.Item
            css={{
              my: "$4",
            }}
            key="change-theme"
            description="Cambiar tema"
            icon={isDark ? <IoSunny /> : <IoMoon />}
          >
            Cambiar a tema {isDark ? "claro" : "oscuro"}
          </Dropdown.Item>
        </Dropdown.Section>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Helper;
