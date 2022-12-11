import CancelablePromise, { cancelable } from "cancelable-promise";
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
  const doAsyncAbortableOperation = useCallback(
    async <T>(
      asyncFuncion: Promise<T>,
      controllerSignal: AbortSignal,
      onAbort?: () => void
    ): Promise<{
      status: UseStatusStore["asyncStatus"];
      data: T | null;
    }> => {
      const operationId = addAsyncOperation();
      return new Promise((res, rej) => {
        const handleAbort = () => {
          controllerSignal.removeEventListener("abort", handleAbort);
          endAsyncOperation(operationId, AsyncStatusEnum.ABORTED);
          rej({ data: "ABORTED", status: AsyncStatusEnum.ABORTED });
          onAbort && onAbort();
        };
        controllerSignal.addEventListener("abort", handleAbort);

        asyncFuncion
          .then((response) => {
            endAsyncOperation(operationId, AsyncStatusEnum.SUCCESS);
            if (controllerSignal.aborted) return rej("ABORTED");
            res({ data: response, status: AsyncStatusEnum.SUCCESS });
          })
          .catch((err) => {
            endAsyncOperation(operationId, AsyncStatusEnum.FAIL);
            if (controllerSignal.aborted) return rej("ABORTED");
            rej({ data: err as T, status: AsyncStatusEnum.FAIL });
          });
      });
    },
    []
  );

  return { doAsyncOperation, doAsyncAbortableOperation };
};

export default useAsync;
