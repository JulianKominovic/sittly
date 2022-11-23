import React from 'react';
import create from 'zustand';
import { Action } from '../ui/list/ListItem';
import { FontSizeType } from '../types/fontSize';

export type HelperAction = {
  icon: React.ReactNode;
  subtitle: string;
  title: string;
  iconSize: FontSizeType;
} & Action;

type UseHelper = {
  options: HelperAction[];
  setOptions: (options: HelperAction[]) => void;
  elementToRefocus: HTMLElement | null;
  showingHelper: boolean;
  showHelper: (elementToRefocus: HTMLElement) => void;
  hideHelper: () => void;
  showingHelperAdvise: boolean;
  showHelperAdvise: () => void;
  hideHelperAdvise: () => void;
  focusLastElement: () => void;
};

export const useHelper = create<UseHelper>((set, get) => ({
  options: [],
  setOptions: (options: HelperAction[]) => {
    set((prev) => ({ ...prev, options }));
  },

  showingHelperAdvise: false,
  showHelperAdvise: () => set((prev) => ({ ...prev, showingHelperAdvise: true })),
  hideHelperAdvise: () => set((prev) => ({ ...prev, showingHelperAdvise: false })),
  elementToRefocus: null,
  showingHelper: false,
  showHelper: (elementToRefocus: HTMLElement) => set((prev) => ({ ...prev, showingHelper: true, elementToRefocus })),
  focusLastElement: () => {
    const { elementToRefocus } = get();
    elementToRefocus?.focus();
    elementToRefocus?.scrollIntoView({ block: 'center' });
  },
  hideHelper: () =>
    set((prev) => {
      return { ...prev, showingHelper: false };
    })
}));
