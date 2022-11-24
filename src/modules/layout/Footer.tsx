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
    <footer
      className={`bg-black bg-opacity-60 z-10 left-0 bottom-0 backdrop-blur-sm rounded-3xl rounded-t-none w-[calc(100%-2px)] px-6 py-2 h-[38px] fixed overflow-hidden flex items-center justify-between text-xs border border-gray-800 ${chooseStatusGradients(
        asyncStatus
      )} before:w-full before:z-10 before:h-16 rounded-full before:left-0 before:top-0 before:absolute before:opacity-40 ${
        asyncStatus === AsyncStatusEnum.IN_PROGRESS
          ? "before:animate-bounce before:ease-in-out"
          : ""
      }`}
    >
      <main className="flex items-center w-1/2">
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
      </main>
      {options.length > 0 && showingHelperAdvise ? (
        <aside className="flex gap-2 items-center">
          <small className="text-xs">Más acciones/</small>
          <Keystroke keys={[KEYS.ControlLeft, KEYS.Space]} id="helper-firing" />
        </aside>
      ) : null}
    </footer>
  );
};

export default Footer;
