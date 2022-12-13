import { useCallback } from "react";
import {
  LoadingEnum,
  UseLoadingStore,
  useLoadingStore,
} from "../store/loadingStore";

const useLoading = () => {
  const addAsyncOperation = useLoadingStore((state) => state.addAsyncOperation);
  const endAsyncOperation = useLoadingStore((state) => state.endAsyncOperation);

  const doShortAsyncCancelableOperation = useCallback(
    async <T>(
      statusMessage: string,
      asyncFuncion: Promise<T>,
      controllerSignal: AbortSignal,
      onAbort?: () => void
    ): Promise<{
      status: UseLoadingStore["asyncStatus"];
      data: T | null;
    }> => {
      const operationId = addAsyncOperation(statusMessage);
      return new Promise((res, rej) => {
        const handleAbort = () => {
          controllerSignal.removeEventListener("abort", handleAbort);
          endAsyncOperation(operationId, LoadingEnum.ABORTED, statusMessage);
          rej({ data: "ABORTED", status: LoadingEnum.ABORTED });
          onAbort && onAbort();
        };
        controllerSignal.addEventListener("abort", handleAbort);

        asyncFuncion
          .then((response) => {
            endAsyncOperation(operationId, LoadingEnum.SUCCESS, statusMessage);
            if (controllerSignal.aborted) return rej("ABORTED");
            res({ data: response, status: LoadingEnum.SUCCESS });
          })
          .catch((err) => {
            endAsyncOperation(operationId, LoadingEnum.FAIL, statusMessage);
            if (controllerSignal.aborted) return rej("ABORTED");
            rej({ data: err as T, status: LoadingEnum.FAIL });
          });
      });
    },
    []
  );

  const doShortAsyncOperation = async <T>(
    statusMessage: string,
    asyncFuncion: Promise<T>
  ): Promise<{
    status: UseLoadingStore["asyncStatus"];
    data: T | null;
  }> => {
    const operationId = addAsyncOperation(statusMessage);
    let response;
    try {
      response = await asyncFuncion;
      endAsyncOperation(operationId, LoadingEnum.SUCCESS, statusMessage);
      return { data: response, status: LoadingEnum.SUCCESS };
    } catch (err) {
      endAsyncOperation(operationId, LoadingEnum.FAIL, statusMessage);
      return { data: err as T, status: LoadingEnum.FAIL };
    }
  };
  return {
    doShortAsyncOperation,
    doShortAsyncCancelableOperation,
  };
};

export default useLoading;
