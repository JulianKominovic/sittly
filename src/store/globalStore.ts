import create, { StoreApi } from 'zustand';
import { ITEMS } from '../modules/navbar/config/navbar';

type UseGlobalStore = {
  currentTab: keyof typeof ITEMS;
  currentTabData: any[];
  currentItem: {};
  navigationAxisY: string | number;
  setCurrentTab: (value: keyof typeof ITEMS) => void;
  setCurrentTabData: (value: any[]) => void;
  setCurrentItem: (value: any) => void;
};

export const useGlobalStore = create<UseGlobalStore>((set) => ({
  currentTab: 'app',
  currentTabData: [],
  currentItem: {},
  navigationAxisY: 0,
  setCurrentTab: (value: keyof typeof ITEMS) => set((prev) => ({ ...prev, currentTab: value })),
  setCurrentTabData: (value: any[]) => set((prev) => ({ ...prev, currentTabData: value }), true),
  setCurrentItem: (value: any) => set((prev) => ({ ...prev, currentItem: value }))
}));
