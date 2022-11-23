import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineLoading,
} from "react-icons/ai";
import { AsyncStatusEnum } from "../../../store/statusbarStore";

export const StatusWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="flex gap-2">{children}</div>
);

export const chooseStatusGradients = (status: AsyncStatusEnum) => {
  if (status === AsyncStatusEnum.IN_PROGRESS)
    return "before:bg-gradient-to-tr before:from-yellow-800 before:to-transparent";
  if (status === AsyncStatusEnum.SUCCESS)
    return "before:bg-gradient-to-tr before:from-green-800 before:to-transparent";
  if (status === AsyncStatusEnum.FAIL)
    return "before:bg-gradient-to-tr before:from-red-800 before:to-transparent";
};

export const chooseRenderByStatus = (
  status: AsyncStatusEnum,
  operations: { id: string; status: AsyncStatusEnum }[]
) => {
  const InprogressOperations = operations.filter(
    (op) => op.status === AsyncStatusEnum.IN_PROGRESS
  ).length;
  const SucceedOperations = operations.filter(
    (op) => op.status === AsyncStatusEnum.SUCCESS
  ).length;
  const FailedOperations = operations.filter(
    (op) => op.status === AsyncStatusEnum.FAIL
  ).length;

  const StatusMessage = () => (
    <>
      <span className="mx-2">{InprogressOperations}</span>
      <AiOutlineLoading
        className={`inline-flex ${InprogressOperations && "animate-spin"}`}
      />
      <span className="mx-2"> {SucceedOperations}</span>
      <AiOutlineCheck className="inline-flex mx-2" />{" "}
      <span className="mx-2">{FailedOperations}</span>{" "}
      <AiOutlineClose className="inline-flex mx-2" />
    </>
  );

  if (status === AsyncStatusEnum.IN_PROGRESS)
    return (
      <StatusWrapper>
        {/* <AiOutlineLoading className="text-yellow-500 animate-spin" /> */}
        <p className="text-yellow-500">{<StatusMessage />}</p>
      </StatusWrapper>
    );
  if (status === AsyncStatusEnum.SUCCESS)
    return (
      <StatusWrapper>
        {/* <AiOutlineCheck className="text-green-500" /> */}
        <p className="text-green-500">{<StatusMessage />}</p>
      </StatusWrapper>
    );
  if (status === AsyncStatusEnum.FAIL)
    return (
      <StatusWrapper>
        {/* <AiOutlineClose className="text-red-500" /> */}
        <p className="text-red-500">{<StatusMessage />}</p>
      </StatusWrapper>
    );
  return null;
};
