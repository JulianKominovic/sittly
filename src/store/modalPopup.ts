import create from "zustand";

type UseShowingModal = {
  showingModal: boolean;
  setShowingModal: (value: boolean) => void;
};

export const useShowingModal = create<UseShowingModal>((set) => {
  return {
    showingModal: false,
    setShowingModal: (value: boolean) => set(() => ({ showingModal: value })),
  };
});
