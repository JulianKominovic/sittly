import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { KEYS } from "../../../lib/keys";
import Keystroke from "../../../ui/Keystroke";

type Props = {
  id: string;
  title: string;
  index: number;
};

function Link({ id, title, index }: Props) {
  const focusableKey: KEYS[] = [
    KEYS.ControlLeft,
    KEYS[`Digit${String(index + 1) as "0"}`],
  ];
  const location = useLocation();

  return (
    <NavLink
      to={id}
      tabIndex={-1}
      className={({ isActive }) =>
        `${
          (isActive && id !== "" && location.pathname !== "/") ||
          (id === "" && location.pathname === "/")
            ? "active-navlink navlink"
            : "inactive-navlink navlink"
        }`
      }
      data-focuseablekeyctrl={String(index + 1)}
    >
      {title}
      <Keystroke keys={focusableKey} id={id} />
    </NavLink>
  );
}

export default Link;
