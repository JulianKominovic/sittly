import create from "zustand";

export enum LoadingEnum {
  IN_PROGRESS = "IN_PROGRESS",
  SUCCESS = "SUCCESS",
  FAIL = "FAIL",
  ABORTED = "ABORTED",
  IDLE = "IDLE",
}

export type UseLoadingStore = {
  asyncStatus: LoadingEnum;
  timeoutId: number | NodeJS.Timer;
  asyncOperations: {
    id: string;
    status: LoadingEnum;
    statusMessage: string;
  }[];
  addAsyncOperation: (statusMessage: string) => string;
  endAsyncOperation: (
    id: string,
    status: LoadingEnum.FAIL | LoadingEnum.SUCCESS | LoadingEnum.ABORTED,
    statusMessage: string
  ) => void;
};

export const useLoadingStore = create<UseLoadingStore>((set, get) => ({
  asyncStatus: LoadingEnum.IDLE,
  asyncOperations: [],
  timeoutId: -1,

  addAsyncOperation: (statusMessage: string) => {
    const taskId = crypto.randomUUID();
    const task = { id: taskId, status: LoadingEnum.IN_PROGRESS, statusMessage };
    set((prev) => {
      clearTimeout(prev.timeoutId);
      return {
        ...prev,
        asyncOperations: [...prev.asyncOperations, task],
        timeoutId: -1,
      };
    });
    return taskId;
  },
  endAsyncOperation: (
    id: string,
    status: LoadingEnum.FAIL | LoadingEnum.SUCCESS | LoadingEnum.ABORTED,
    statusMessage: string
  ) => {
    set((prev) => {
      const asyncOperations = prev.asyncOperations.filter(
        (operation) => operation.id !== id
      );

      let timeoutId = -1;

      if (
        asyncOperations.filter((op) => op.status === LoadingEnum.IN_PROGRESS)
          .length === 0
      ) {
        timeoutId = setTimeout(() => {
          clearTimeout(timeoutId);
          set((previous) => ({ ...previous, timeoutId, asyncOperations: [] }));
        }, 3000) as unknown as number;
      }

      return {
        ...prev,
        asyncOperations: asyncOperations.concat({ id, status, statusMessage }),
        timeoutId,
      };
    });
  },
}));
