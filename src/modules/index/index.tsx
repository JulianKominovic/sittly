import fuzzysort from "fuzzysort";
import React, { useMemo } from "react";
import { BsEmojiLaughingFill } from "react-icons/bs";
import { IoApps } from "react-icons/io5";
import { HiCommandLine, HiHome } from "react-icons/hi2";
import { Navigate, RouteProps, useNavigate } from "react-router";
import { RiSettingsFill } from "react-icons/ri";
import useQuerybar from "../../hooks/useQuerybar";
import { KEYS } from "../../lib/keys";

import List from "../../ui/list";
import Config from "../config";
import Emojis from "../emojis";
import FlexDemo from "../demo";
import useOpenLink from "../../hooks/useOpenLink";
import Commands from "../commands";
import useExecCommand from "../../hooks/useExecCommand";
import { UseStatusStore } from "../../store/statusbarStore";
import { TailwindColors } from "../../enum/TailwindColors";
import CreateOrEditCommand from "../commands/create";
import Preview from "../commands/preview";
import PreviewIndex from "../commands/preview/PreviewIndex";
import { FiLink } from "react-icons/fi";
import LinkSaver from "../links";

type OnlyQuerybarModuleProps = {
  querybar: {
    querybarValue: string;
  };
  commands: {
    executeCommand: (cmd: string) => Promise<{
      status: UseStatusStore["asyncStatus"];
      data: any;
    }>;
  };
  browser: {
    openLink: (link: string) => Promise<void>;
  };
};
type OnlyQuerybarModule = {
  onlyQuerybarFuncion: true;
  querybarFunction?: ({
    commands,
    querybar,
    browser,
  }: OnlyQuerybarModuleProps) => void;
  triggerWord: string;
};
type StandardModule = {
  onlyQuerybarFuncion: false;
  routes: RouteProps[];
};
type Manifest = {
  module: string;
  displayName: string;
  description: string;
  icon: React.ReactNode;
  iconColor?: TailwindColors;
  entryPoint: OnlyQuerybarModule | StandardModule;
};

export const INDEX: Manifest[] = [
  {
    module: "",
    displayName: "Home",
    description: "Home index",
    icon: <HiHome />,
    entryPoint: {
      onlyQuerybarFuncion: false,
      routes: [
        {
          index: true,
          element: <></>,
        },
      ],
    },
    iconColor: TailwindColors.blue,
  },
  {
    module: "Emojis",
    displayName: "Emojis",
    description: "Pick your favourite emoji!",
    icon: <BsEmojiLaughingFill />,
    entryPoint: {
      onlyQuerybarFuncion: false,
      routes: [
        {
          index: true,
          element: <Emojis />,
        },
      ],
    },
    iconColor: TailwindColors.amber,
  },
  {
    module: "Apps",
    displayName: "Apps",
    description: "Apps!",
    icon: <IoApps />,
    entryPoint: {
      onlyQuerybarFuncion: false,
      routes: [
        {
          index: true,
          element: <FlexDemo />,
        },
      ],
    },
    iconColor: TailwindColors.emerald,
  },
  {
    module: "Commands",
    displayName: "Commands",
    description: "Save useful commands and secuences",
    icon: <HiCommandLine />,
    entryPoint: {
      onlyQuerybarFuncion: false,
      routes: [
        {
          index: true,
          element: <Commands />,
        },
        {
          path: "create",
          element: <CreateOrEditCommand />,
        },
        {
          path: "edit/:id",
          element: <CreateOrEditCommand />,
        },
        {
          path: "preview/:id",
          element: <PreviewIndex />,
        },

        {
          path: "edit",
          element: <Navigate to={"../"} relative="path" />,
        },
        {
          path: "preview",
          element: <Navigate to={"../"} relative="path" />,
        },
      ],
    },
    iconColor: TailwindColors.indigo,
  },
  {
    module: "Links",
    displayName: "Links",
    description: "Links guardados",
    icon: <FiLink />,
    entryPoint: {
      onlyQuerybarFuncion: false,
      routes: [
        {
          index: true,
          element: <LinkSaver />,
        },
      ],
    },
    iconColor: TailwindColors.indigo,
  },
  {
    module: "Run command",
    displayName: "Run command",
    description: "Run command from Query bar",
    icon: "🚀",
    entryPoint: {
      onlyQuerybarFuncion: true,
      querybarFunction: ({ commands, querybar }) => {
        commands.executeCommand(querybar.querybarValue);
      },
      triggerWord: "/",
    },
    iconColor: TailwindColors.orange,
  },
  {
    module: "Settings",
    displayName: "Settings",
    description: "Customize Sittly",
    icon: <RiSettingsFill />,
    entryPoint: {
      onlyQuerybarFuncion: false,
      routes: [
        {
          index: true,
          element: <Config />,
        },
      ],
    },
    iconColor: TailwindColors.red,
  },
];
const Index = () => {
  const navigate = useNavigate();
  const { value } = useQuerybar();
  const { openLink } = useOpenLink();
  const { executeCommand } = useExecCommand();

  const DEFAULT_ITEM = {
    icon: "🔍",
    displayName: "Google",
    module: "Google",
    description: `Buscar '${value}' en google`,
    entryPoint: {
      onlyQuerybarFuncion: true,
      triggerWord: "g:",
      querybarFunction: ({ querybar, browser }) => {
        browser.openLink(
          `https://google.com/search?q=${querybar.querybarValue}`
        );
      },
    },
  };

  const memoizedIndex: Manifest[] = useMemo(() => {
    if (!value)
      return INDEX.filter((item) => !item.entryPoint.onlyQuerybarFuncion);
    const notQuerybarFunctionItems = fuzzysort
      .go(value, INDEX, {
        key: "displayName",
      })
      .map(({ obj }) => obj)
      .filter((item) => !item.entryPoint.onlyQuerybarFuncion);
    if (notQuerybarFunctionItems.length > 0) return notQuerybarFunctionItems;

    const findByTriggeringWord = INDEX.concat(DEFAULT_ITEM).filter(
      (item) =>
        item.entryPoint.onlyQuerybarFuncion &&
        new RegExp(`${item.entryPoint.triggerWord}.*`, "i").test(value)
    );
    return findByTriggeringWord.length > 0
      ? findByTriggeringWord
      : [DEFAULT_ITEM];
  }, [value]);

  return (
    <div>
      {memoizedIndex.map((item, index) => (
        <List.Item
          key={item.module + index}
          title={item.displayName}
          subtitle={item.description}
          iconColor={item.iconColor}
          icon={item.icon}
          action={{
            callback: () => {
              if (item.entryPoint.onlyQuerybarFuncion) {
                item.entryPoint.querybarFunction?.({
                  querybar: {
                    querybarValue: value
                      .replace(item.entryPoint.triggerWord, "")
                      .trim(),
                  },
                  commands: {
                    executeCommand,
                  },
                  browser: {
                    openLink,
                  },
                });
              } else {
                navigate(item.module);
              }
            },
            explanation: "Ir",
            keys: [KEYS.Enter],
          }}
        />
      ))}
    </div>
  );
};
export default Index;
