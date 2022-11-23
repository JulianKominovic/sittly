import { useCallback, useMemo } from "react";
import {
  AsyncStatusEnum,
  UseStatusStore,
  useStatusStore,
} from "../store/statusbarStore";

const useAsync = () => {
  const addAsyncOperation = useStatusStore((state) => state.addAsyncOperation);
  const endAsyncOperation = useStatusStore((state) => state.endAsyncOperation);

  const doAsyncOperation = useCallback(
    async <T>(
      asyncFuncion: Promise<T>
    ): Promise<{
      status: UseStatusStore["asyncStatus"];
      data: T | null;
    }> => {
      const operationId = addAsyncOperation();
      let response;
      try {
        response = await asyncFuncion;
        endAsyncOperation(operationId, AsyncStatusEnum.SUCCESS);
        return { data: response, status: AsyncStatusEnum.SUCCESS };
      } catch (err) {
        endAsyncOperation(operationId, AsyncStatusEnum.FAIL);
        return { data: err as T, status: AsyncStatusEnum.FAIL };
      }
    },
    []
  );

  return { doAsyncOperation };
};

export default useAsync;
