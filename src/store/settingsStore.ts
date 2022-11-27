import create from "zustand";

type UseSettings = {
  colorPallette: string;
  setColorPallette: (value: string) => void;
};

export const useSettings = create<UseSettings>((set) => {
  const storage = localStorage.getItem("Setting");
  console.log(storage);
  return {
    colorPallette: storage ? JSON.parse(storage).theme : "",
    setColorPallette: (value: string) =>
      set((prev) => ({ ...prev, colorPallette: value })),
  };
});
