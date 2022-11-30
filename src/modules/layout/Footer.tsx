import { Container } from "@nextui-org/react";
import React, { useMemo } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { useLocation } from "react-router";
import firstLetterUpperCase from "../../lib/firstLetterUpperCase";
import { KEYS } from "../../lib/keys";
import { useHelper } from "../../store/helperStore";
import { AsyncStatusEnum, useStatusStore } from "../../store/statusbarStore";
import Keystroke from "../../ui/Keystroke";
import FooterBreadcumbItem from "./components/FooterBreadcumbItem";
import {
  chooseRenderByStatus,
  chooseStatusGradients,
} from "./components/FooterStatus";
import Helper from "./Helper";

const Footer = () => {
  const { options, showingHelperAdvise } = useHelper((state) => ({
    options: state.options,
    showingHelperAdvise: state.showingHelperAdvise,
  }));
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
            asyncStatus !== AsyncStatusEnum.IDLE ? "$yellow500" : "transparent",
          position: "absolute",
          left: "$0",
          bottom: "$0",
          content: "",
          zIndex: "-1",
          w: "100%",
          h: "100%  ",
        },
      }}
      fluid
      className={` ${chooseStatusGradients(
        asyncStatus
      )} before:w-full before:z-10 before:h-16 rounded-full before:left-0 before:top-0 before:absolute before:opacity-40 ${
        asyncStatus === AsyncStatusEnum.IN_PROGRESS
          ? "before:animate-bounce before:ease-in-out"
          : ""
      }`}
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
        {asyncStatus !== AsyncStatusEnum.IDLE
          ? chooseRenderByStatus(asyncStatus, asyncOperations)
          : paths.map((path, index) => {
              const isTheLastItem = index === paths.length - 1;
              return (
                <div key={"footer" + index} className="flex items-center">
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
            })}
      </Container>

      <Helper />
    </Container>
  );
};

export default Footer;
