import { Container } from "@nextui-org/react";
import React, { useMemo } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { useLocation } from "react-router";
import firstLetterUpperCase from "../../lib/firstLetterUpperCase";
import { useLoadingStore } from "../../store/loadingStore";
import { AsyncStatusEnum, useStatusStore } from "../../store/statusbarStore";
import FooterBreadcumbItem from "./components/FooterBreadcumbItem";
import { FooterStatus } from "./components/FooterStatus";
import Helper from "./Helper";

const Footer = () => {
  const asyncOperations = useStatusStore((state) => state.asyncOperations);
  const asyncStatus = useMemo(() => {
    if (asyncOperations.length === 0) return AsyncStatusEnum.IDLE;
    if (
      asyncOperations.some(
        (operation) => operation.status === AsyncStatusEnum.IN_PROGRESS
      )
    )
      return AsyncStatusEnum.IN_PROGRESS;
    if (
      asyncOperations.every(
        (operation) => operation.status === AsyncStatusEnum.SUCCESS
      )
    )
      return AsyncStatusEnum.SUCCESS;

    if (
      asyncOperations.some(
        (operation) => operation.status === AsyncStatusEnum.FAIL
      )
    )
      return AsyncStatusEnum.FAIL;

    return AsyncStatusEnum.IN_PROGRESS;
  }, [asyncOperations]);

  const loadingOperations = useLoadingStore((state) => state.asyncOperations);

  const { pathname } = useLocation();
  const paths = pathname.split("/").filter(Boolean);
  return (
    <Container
      as="footer"
      css={{
        bg: "$backgroundAlpha",
        position: "absolute",
        zIndex: "$2",
        left: "$0",
        bottom: "$0",
        h: "38px",
        justifyContent: "space-between",
        borderBottomLeftRadius: "24px",
        borderBottomRightRadius: "24px",
        w: "100%",
        maxW: "none",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        "&::before": {
          background:
            loadingOperations?.length > 0
              ? "linear-gradient(90deg,transparent,transparent, rgba(230, 230, 230, 0.2), transparent)"
              : asyncStatus === AsyncStatusEnum.SUCCESS
              ? "linear-gradient(90deg,transparent,transparent, rgba(111, 255, 0, 0.2), transparent)"
              : asyncStatus === AsyncStatusEnum.FAIL
              ? "linear-gradient(90deg,transparent,transparent, rgba(255, 0, 0, 0.2), transparent)"
              : asyncStatus === AsyncStatusEnum.IN_PROGRESS
              ? "linear-gradient(90deg, transparent,transparent,rgba(255, 183, 0, 0.2), transparent)"
              : "$backgroundAlpha",
          backgroundSize: "200% 100%",
          animation:
            asyncStatus !== AsyncStatusEnum.IDLE ||
            loadingOperations?.length > 0
              ? "gradient 2s infinite"
              : "none",
          position: "absolute",
          left: "$0",
          bottom: "$0",
          top: "$0",
          content: "",
          zIndex: "-1",
          w: "100%",
          h: "100%",
        },
        ".link-footer": {
          color: "$accents9",
          alignItems: "center",
          display: "flex",
          gap: "$4",
          fontSize: "$sm",
          userSelect: "none",
          pointerEvents: "none",
        },
        ".footer-links-steps": {
          alignItems: "center",
          display: "flex",
          gap: "$4",
          fontSize: "$sm",
        },
      }}
      fluid
    >
      <Container
        css={{
          display: "flex",
          alignItems: "center",
          w: "66%",
          mx: "0",
          p: "0",
        }}
      >
        {asyncStatus !== AsyncStatusEnum.IDLE ||
        loadingOperations?.length > 0 ? (
          <FooterStatus
            operations={asyncOperations}
            status={asyncStatus}
            shortOperations={loadingOperations}
          />
        ) : (
          paths.map((path, index) => {
            const isTheLastItem = index === paths.length - 1;
            return (
              <div key={"footer" + index} className="footer-links-steps">
                <FooterBreadcumbItem
                  to={
                    index === 1
                      ? path
                      : paths.slice(index).concat(path).join("/")
                  }
                  label={firstLetterUpperCase(path)}
                  isFirstItem={index === 0}
                />
                {isTheLastItem ? null : (
                  <BsArrowRightShort className="inline text-lg" />
                )}
              </div>
            );
          })
        )}
      </Container>

      <Helper />
    </Container>
  );
};

export default Footer;
