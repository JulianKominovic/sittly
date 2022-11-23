import create from 'zustand';

type ColorScheme = {
  '50': string;
  '100': string;
  '200': string;
  '300': string;
  '400': string;
  '500': string;
  '600': string;
  '700': string;
  '800': string;
  '900': string;
};
type UseSettings = {
  colorPallette: ColorScheme | unknown;
  setColorPallette: (value: ColorScheme) => void;
};

export const useSettings = create<UseSettings>((set) => ({
  colorPallette: {},
  setColorPallette: (value: ColorScheme) => set((prev) => ({ ...prev, colorPallette: value }))
}));
