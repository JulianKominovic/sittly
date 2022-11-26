import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
// import { motion } from 'framer-motion';
import firstLetterUpperCase from "../../lib/firstLetterUpperCase";
import { KEYS } from "../../lib/keys";
import Keystroke from "../Keystroke";
import { borderClasses, focusedClasses, hoverClasses } from "../styles";
import { HelperAction, useHelper } from "../../store/helperStore";
import { FontSizeType } from "../../types/fontSize";
import Icon from "../decoration/Icon";
import { TailwindColors } from "../../enum/TailwindColors";

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
  staging?: {
    nextStage?: Stage;
  };
  icon?: React.ReactNode | SVGElement | string;
  iconSize?: FontSizeType;
  iconColor?: TailwindColors;
  onBlur?: (e: HTMLButtonElement) => void;
  onFocus?: (e: HTMLButtonElement) => void;
  ref?: any;
};

function ListItem({
  title,
  subtitle,
  imageSrc,
  action,
  staging,
  icon,
  iconSize = "base",
  helperActions,
  alwaysShowKeys,
  onBlur,
  onFocus,
  iconColor,
  ...props
}: ListItemProps) {
  const location = useLocation();
  const keystrokeRef = useRef<HTMLDivElement | null>(null);

  const setOptions = useHelper((state) => state.setOptions);
  const hideHelperAdvise = useHelper((state) => state.hideHelperAdvise);
  const showHelperAdvise = useHelper((state) => state.showHelperAdvise);
  const showingHelperAdvise = useHelper((state) => state.showingHelperAdvise);
  const showingHelper = useHelper((state) => state.showingHelper);
  const showHelper = useHelper((state) => state.showHelper);
  const hideHelper = useHelper((state) => state.hideHelper);

  const handleActionKeys = (act: Action, e: KeyboardEvent) => {
    if (
      act.keys
        .filter((k) => k !== KEYS.ControlLeft)
        .every((key) => {
          const actionUsesControl = act.keys.some(
            (k) => k === KEYS.ControlLeft
          );
          if (actionUsesControl) return e.ctrlKey && key === e.key;
          return key === e.code;
        })
    ) {
      e.preventDefault();

      act.callback(props);
    }
  };

  return (
    <button
      {...props}
      // initial={{ translateX: 40, opacity: 0 }}
      // animate={{ translateX: 0, opacity: 1 }}
      // exit={{ translateX: 40, opacity: 0 }}
      // transition={{ duration: 0.2 }}
      data-stagenext={staging?.nextStage?.to}
      className={`flex items-center justify-between gap-2 mb-1 border-transparent ${focusedClasses()} ${hoverClasses()} rounded-lg p-2 text-sm w-full max-w-full active:scale-95 active:bg-gray-600 transition-transform`}
      tabIndex={0}
      onFocus={(e) => {
        if (
          !e.currentTarget.hasAttribute("is-helper-option") &&
          showingHelper
        ) {
          hideHelper();
        }
        if (
          helperActions?.length > 0 &&
          !e.currentTarget.hasAttribute("is-helper-option")
        ) {
          const id = setTimeout(() => {
            setOptions(helperActions);
            showHelperAdvise();
            clearTimeout(id);
          }, 1);
        }

        if (keystrokeRef.current) keystrokeRef.current.style.display = "flex";
        onFocus?.(e.target);
      }}
      onClick={(e) => {
        if (e.ctrlKey && showingHelperAdvise) {
          showHelper(e.currentTarget);
          return;
        }
        if (action) {
          handleActionKeys(action, e);
        }

        e.currentTarget.focus();
        action?.callback?.(props);
      }}
      onKeyDown={(e) => {
        if (helperActions?.length > 0) {
          helperActions.forEach((act) => {
            handleActionKeys(act, e);
          });
        }
      }}
      onBlur={(e) => {
        hideHelperAdvise();
        onBlur?.(e.currentTarget);
        if (keystrokeRef.current && !alwaysShowKeys)
          keystrokeRef.current.style.display = "none";
      }}
    >
      <main
        // layout
        className="flex items-center gap-2"
      >
        {location.pathname.split("/").filter(Boolean).length > 1 ? (
          <aside className="flex gap-2 items-center justify-center">
            <Keystroke rounded id={title} keys={[KEYS.ArrowLeft]} />
          </aside>
        ) : null}
        <Icon
          iconColor={iconColor}
          imageSrc={imageSrc}
          title={title}
          icon={icon}
          iconSize={iconSize}
        />

        <aside>
          <small className="block text-left whitespace-nowrap overflow-hidden text-ellipsis max-w-[40ch] text-gray-400 text-xs">
            {firstLetterUpperCase(subtitle) || "ㅤ"}
          </small>
          <p className="leading-3 block text text-left text-gray-200">
            {firstLetterUpperCase(title)}
          </p>
        </aside>
      </main>

      <div
        ref={keystrokeRef}
        // layout
        // key={id + 'k'}
        // initial={{ translateX: -10, opacity: 0 }}
        // animate={{ translateX: 0, opacity: 1 }}
        // exit={{ translateX: -10, opacity: 0 }}
        className={`${alwaysShowKeys ? "flex" : "hidden"} gap-2`}
      >
        {action ? (
          <aside className="flex gap-2 items-center">
            <small>{action.explanation}/</small>
            <Keystroke id={title} keys={action.keys} />{" "}
          </aside>
        ) : null}
      </div>
    </button>
  );
}

export default ListItem;
