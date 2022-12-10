import create from "zustand";

export enum AsyncStatusEnum {
  IN_PROGRESS = "IN_PROGRESS",
  SUCCESS = "SUCCESS",
  FAIL = "FAIL",
  ABORTED = "ABORTED",
  IDLE = "IDLE",
}

export type UseStatusStore = {
  asyncStatus: AsyncStatusEnum;
  timeoutId: number | NodeJS.Timer;
  asyncOperations: { id: string; status: AsyncStatusEnum }[];
  addAsyncOperation: () => string;
  endAsyncOperation: (
    id: string,
    status:
      | AsyncStatusEnum.FAIL
      | AsyncStatusEnum.SUCCESS
      | AsyncStatusEnum.ABORTED
  ) => void;
};

export const useStatusStore = create<UseStatusStore>((set, get) => ({
  asyncStatus: AsyncStatusEnum.IDLE,
  asyncOperations: [],
  timeoutId: -1,

  addAsyncOperation: () => {
    const taskId = crypto.randomUUID();
    const task = { id: taskId, status: AsyncStatusEnum.IN_PROGRESS };
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
    status:
      | AsyncStatusEnum.FAIL
      | AsyncStatusEnum.SUCCESS
      | AsyncStatusEnum.ABORTED
  ) => {
    set((prev) => {
      const asyncOperations = prev.asyncOperations.filter(
        (operation) => operation.id !== id
      );

      let timeoutId = -1;

      if (
        asyncOperations.filter(
          (op) => op.status === AsyncStatusEnum.IN_PROGRESS
        ).length === 0
      ) {
        timeoutId = setTimeout(() => {
          clearTimeout(timeoutId);
          set((previous) => ({ ...previous, timeoutId, asyncOperations: [] }));
        }, 3000) as unknown as number;
      }

      return {
        ...prev,
        asyncOperations: asyncOperations.concat({ id, status }),
        timeoutId,
      };
    });
  },
}));
