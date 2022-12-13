import { Container } from "@nextui-org/react";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineLoading,
} from "react-icons/ai";
import { BsCircleFill } from "react-icons/bs";
import { LoadingEnum } from "../../../store/loadingStore";
import { AsyncStatusEnum } from "../../../store/statusbarStore";

export const StatusWrapper = ({ children }: { children: React.ReactNode }) => (
  <Container>{children}</Container>
);

const AsyncOperationStatusMessage = ({
  InprogressOperations,
  SucceedOperations,
  FailedOperations,
}: {
  InprogressOperations: number;
  SucceedOperations: number;
  FailedOperations: number;
}) => (
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
        animation: InprogressOperations ? "spinning 1s ease infinite" : "none",
      }}
      className={`inline-flex yellow ${InprogressOperations && "animate-spin"}`}
    />
    <span className="green"> {SucceedOperations}</span>
    <AiOutlineCheck className="inline-flex green" />{" "}
    <span className="red">{FailedOperations}</span>{" "}
    <AiOutlineClose className="inline-flex red" />
  </Container>
);

const AsyncOperation = ({ operations, status }: FooterStatus) => {
  const InprogressOperations = operations.filter(
    (op) => op.status === AsyncStatusEnum.IN_PROGRESS
  ).length;
  const SucceedOperations = operations.filter(
    (op) => op.status === AsyncStatusEnum.SUCCESS
  ).length;
  const FailedOperations = operations.filter(
    (op) => op.status === AsyncStatusEnum.FAIL
  ).length;

  if (status === AsyncStatusEnum.IN_PROGRESS)
    return (
      <StatusWrapper>
        <p>
          {
            <AsyncOperationStatusMessage
              InprogressOperations={InprogressOperations}
              SucceedOperations={SucceedOperations}
              FailedOperations={FailedOperations}
            />
          }
        </p>
      </StatusWrapper>
    );
  if (status === AsyncStatusEnum.SUCCESS)
    return (
      <StatusWrapper>
        <p>
          {
            <AsyncOperationStatusMessage
              InprogressOperations={InprogressOperations}
              SucceedOperations={SucceedOperations}
              FailedOperations={FailedOperations}
            />
          }
        </p>
      </StatusWrapper>
    );
  if (status === AsyncStatusEnum.FAIL)
    return (
      <StatusWrapper>
        <p>
          {
            <AsyncOperationStatusMessage
              InprogressOperations={InprogressOperations}
              SucceedOperations={SucceedOperations}
              FailedOperations={FailedOperations}
            />
          }
        </p>
      </StatusWrapper>
    );
  return null;
};

export type FooterStatus = {
  status: AsyncStatusEnum;
  operations: { id: string; status: AsyncStatusEnum }[];
  shortOperations: {
    id: string;
    status: LoadingEnum;
    statusMessage: string;
  }[];
};

const ShortAsyncOperation = ({ shortOperations }: FooterStatus) => {
  return (
    <Container
      css={{
        m: "0",
        p: "0",
        d: "flex",
        alignItems: "center",
        gap: "$4",
        fontSize: "$sm",
      }}
    >
      <BsCircleFill className="animation-beat" />{" "}
      {shortOperations.at(-1)?.statusMessage}
    </Container>
  );
};

export const FooterStatus = (props: FooterStatus) => {
  if (props.shortOperations?.length > 0) {
    return <ShortAsyncOperation {...props} />;
  } else {
    return <AsyncOperation {...props} />;
  }
};
