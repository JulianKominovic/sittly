import create from 'zustand';

type UseQueryStore = {
  placeholder: string;
  setPlaceholder: (string: string) => void;
  value: string;
  setValue: (value: string) => void;
};

export const useQuerybarStore = create<UseQueryStore>((set) => ({
  placeholder: 'Search...',
  setPlaceholder: (value: string) => set((prev) => ({ ...prev, placeholder: value })),
  value: '',
  setValue: (value: string) => set((prev) => ({ ...prev, value }))
}));
