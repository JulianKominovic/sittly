import { Container } from "@nextui-org/react";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineLoading,
} from "react-icons/ai";
import { AsyncStatusEnum } from "../../../store/statusbarStore";

export const StatusWrapper = ({ children }: { children: React.ReactNode }) => (
  <Container>{children}</Container>
);

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
    <Container
      css={{
        m: "0",
        p: "0",
        d: "flex",
        alignItems: "center",
        gap: "$4",
        ".red": {
          color: "$red600",
        },
        ".green": {
          color: "$green600",
        },
        ".yellow": {
          color: "$yellow600",
        },
      }}
    >
      <span className="yellow">{InprogressOperations}</span>
      <AiOutlineLoading
        style={{
          animation: InprogressOperations
            ? "spinning 1s ease infinite"
            : "none",
        }}
        className={`inline-flex yellow ${
          InprogressOperations && "animate-spin"
        }`}
      />
      <span className="green"> {SucceedOperations}</span>
      <AiOutlineCheck className="inline-flex green" />{" "}
      <span className="red">{FailedOperations}</span>{" "}
      <AiOutlineClose className="inline-flex red" />
    </Container>
  );

  if (status === AsyncStatusEnum.IN_PROGRESS)
    return (
      <StatusWrapper>
        {/* <AiOutlineLoading className="text-yellow-500 animate-spin" /> */}
        <p>{<StatusMessage />}</p>
      </StatusWrapper>
    );
  if (status === AsyncStatusEnum.SUCCESS)
    return (
      <StatusWrapper>
        {/* <AiOutlineCheck className="text-green-500" /> */}
        <p>{<StatusMessage />}</p>
      </StatusWrapper>
    );
  if (status === AsyncStatusEnum.FAIL)
    return (
      <StatusWrapper>
        {/* <AiOutlineClose className="text-red-500" /> */}
        <p>{<StatusMessage />}</p>
      </StatusWrapper>
    );
  return null;
};
