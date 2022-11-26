import React, { useEffect, useMemo, useRef } from "react";
import { KEYS } from "../../lib/keys";
import useQuerybar from "../../hooks/useQuerybar";
import Keystroke from "../../ui/Keystroke";
import { useLocation } from "react-router";
import { INDEX } from "../index";
import { findNextTabStop } from "../../navegation";

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
    <header className="flex items-center h-12 pr-4">
      <div className="text-xl ml-4 rounded-lg bg-gray-200 p-1 text-neutral-900">
        {icon}
      </div>
      <input
        tabIndex={-1}
        id="query-bar"
        ref={searchbar}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="text-xl h-full w-full outline-none px-2 mx-4 placeholder:text-color-normal bg-transparent"
        placeholder={placeholder}
        data-navegable="true"
      />
      <aside className="flex gap-2 items-center mx-4">
        <small className="whitespace-pre">Elegir primer resultado/</small>
        <Keystroke id="query-bar-first-result" keys={[KEYS.Enter]} />
      </aside>
      <aside className="flex gap-2 items-center">
        <small>Escribir/</small>
        <Keystroke id="search-bar" keys={[KEYS.ControlLeft, KEYS.keyF]} />
      </aside>
    </header>
  );
};

export default Querybar;
