import { DropdownItemBaseProps } from "@nextui-org/react/types/dropdown/base/dropdown-item-base";
import React from "react";
import create from "zustand";
import { KeyCodes } from "../types/KeyCodes";
export type ColorVariants =
  | "success"
  | "error"
  | "warning"
  | "primary"
  | "secondary"
  | "default";
export type HelperAction = {
  title: string;
  items: (DropdownItemBaseProps<object> & {
    onClick: () => void;
    key: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    children?: React.ReactNode | undefined;
    keyboardShorcut?: KeyCodes[];
    textColor?: ColorVariants;
    color?: ColorVariants;
  })[];
}[];

type UseHelper = {
  options: HelperAction;
  setOptions: (options: HelperAction) => void;

  isHelperOpen: boolean;
  setHelperOpen: (state: boolean) => void;
};

export const useHelper = create<UseHelper>((set, get) => ({
  options: [],
  setOptions: (options: HelperAction) => {
    set((prev) => ({ ...prev, options }));
  },
  isHelperOpen: false,
  setHelperOpen: (state) => set((prev) => ({ ...prev, isHelperOpen: state })),
}));
