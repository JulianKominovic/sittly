import { Container } from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";
import { AiFillFolderOpen, AiOutlineDatabase } from "react-icons/ai";
import { FiCopy } from "react-icons/fi";
import { RiFolderReceivedLine } from "react-icons/ri";
import { VscMultipleWindows, VscRunAll } from "react-icons/vsc";
import { getIconForFile, getIconForFolder } from "vscode-icons-js";
import { File, FileWithContent } from "../../../electron/types/file";
import useClipboard from "../../hooks/useClipboard";
import useDatabase from "../../hooks/useDatabase";
import { useDebounce } from "../../hooks/useDebounce";
import useFileSystem from "../../hooks/useFileSystem";
import useHelper from "../../hooks/useHelper";
import useOpenApp from "../../hooks/useOpenApp";
import useQuerybar from "../../hooks/useQuerybar";
import { HelperAction } from "../../store/helperStore";
import { LoadingEnum } from "../../store/loadingStore";
import { AsyncStatusEnum } from "../../store/statusbarStore";
import ListItem, { ListItemProps } from "../../ui/list/ListItem";
import VirtualizedList from "../../ui/list/VirtualizedList";
import rescueFocusedElement from "../../ui/utils/rescueFocusedElement";
import Preview from "./Preview";
import { getTypeOfFile } from "./utils/getTypeOfFile";
import { SortByDate } from "./utils/sorting";

type Props = {};

type Sorting = {
  by: "DATE";
  order: "ASC" | "DESC";
};

const FileManager = (props: Props) => {
  const { getFileInfo, getDirectoryFiles, findFile, getHomedir } =
    useFileSystem();
  const { openFile } = useOpenApp();
  const [files, setFiles] = useState<FileWithContent[] | null>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const { value, setValue } = useQuerybar();
  const { setHelperOptions } = useHelper(null);
  const { writeImage, write, writeHTML, pasteToCurrentWindow } = useClipboard();
  const [index, setIndex] = useState(-1);
  const { database, updateContent } =
    useDatabase<{ homedir: string | undefined }>();

  const getDirs = async (path: string) => {
    clearTimeout(timer as NodeJS.Timeout);
    const dirs = await getDirectoryFiles(path as string);

    if (dirs.status === LoadingEnum.SUCCESS) {
      setFiles(SortByDate(dirs.data));
    }
    rescueFocusedElement();
  };

  const searchFile = async (value: string | undefined) => {
    clearTimeout(timer as NodeJS.Timeout);
    const id = setTimeout(() => {
      if (value) {
        findFile(value)
          .then((res) => {
            if (res.status === LoadingEnum.SUCCESS) {
              setFiles(SortByDate(res.data));
            }
          })
          .catch((err) => console.log(err));
      }
    }, 1000);
    setTimer(id);
  };

  useEffect(() => {
    if (value) {
      searchFile(value);
    } else {
      getHomedir().then((res) => {
        getDirs(res);
      });
    }
  }, [value]);

  useEffect(() => {
    if (database?.homedir) {
      getDirs(database.homedir);
    } else {
      getHomedir().then((res) => {
        getDirs(res);
      });
    }
  }, []);

  const goBack = (path: string) => {
    setValue("");
    const currentpath = path
      .replace(/([^\/]+\/[^\/]+)$/, "")
      .replace(/\/$/, "");
    getDirs(currentpath);
  };

  const listItems = files?.map(
    ({ extension, name, path, utf8, content }, i): ListItemProps => {
      const navigationOptions: HelperAction = [
        {
          title: "Navegar",
          items: [
            ...(extension === ""
              ? [
                  {
                    title: "Ir hacia ahi",
                    description: "Desplazarse hacia el directorio " + path,
                    key: "go-to-folder",
                    color: "default",
                    icon: <AiFillFolderOpen />,
                    onClick: () => {
                      getDirs(path);
                    },
                  },
                ]
              : []),
            ...(/\/home\/.*\/.+\//.test(path)
              ? ([
                  {
                    title: "Volver hacia atras",
                    description: "Volver hacia el directorio anterior.",
                    key: "go-back-folder",
                    icon: <RiFolderReceivedLine />,
                    onClick: () => {
                      goBack(path);
                    },
                  },
                ] as any)
              : []),
          ],
        },
      ];

      const actions: HelperAction =
        extension !== ""
          ? [
              {
                title: "Acciones",
                items: [
                  {
                    title: "Abrir",
                    description: "Abrir el archivo " + name,
                    key: "open",
                    color: "default",
                    icon: <VscRunAll />,
                    onClick: () => {
                      openFile(path);
                    },
                  },
                  {
                    title: "Copiar contenido",
                    description:
                      "Copiar el contenido del archivo " +
                      name +
                      " al portapapeles.",
                    key: "copy",
                    textColor: "primary",
                    color: "primary",
                    icon: <FiCopy />,
                    onClick: () => {
                      const fileType = getTypeOfFile(extension);

                      if (fileType === "IMAGE") {
                        writeImage(content);
                      } else if (fileType === "HTML") {
                        writeHTML(utf8);
                      } else {
                        write(utf8);
                      }
                    },
                  },
                  {
                    icon: <VscMultipleWindows />,
                    key: "copy-to-window",
                    textColor: "success",
                    color: "success",
                    description: "Pega en la app actual",
                    title: "Pegar el contenido en la ventana actual.",
                    onClick: () => {
                      const fileType = getTypeOfFile(extension);
                      if (fileType === "IMAGE") {
                        writeImage(content);
                        pasteToCurrentWindow(undefined, "IMAGE");
                      } else if (fileType === "HTML") {
                        writeHTML(utf8);
                        pasteToCurrentWindow();
                      } else {
                        write(utf8);
                        pasteToCurrentWindow();
                      }
                    },
                  },
                ],
              },
            ]
          : [];

      const helperOptions: HelperAction = [
        ...navigationOptions,
        ...actions,
        ...(extension === ""
          ? [
              {
                title: "Persistencia",
                items: [
                  {
                    title: "Setear como directorio inicial",
                    description:
                      "Elegir este directorio como directorio inicial.",
                    key: "save-to-db",
                    icon: <AiOutlineDatabase />,
                    onClick: () => {
                      updateContent(() => ({
                        homedir: path,
                      }));
                    },
                  },
                ],
              },
            ]
          : []),
      ];

      return {
        id: name + path,
        largeSize: "HALF",
        title: name,
        subtitle: path,
        imageSrc: `/public/icons/${
          extension === ""
            ? getIconForFolder(name)
            : getIconForFile(name + extension || "")
        }`,
        divider: false,
        action: {
          callback: () => {
            if (extension === "") {
              getDirs(path);
            } else {
              openFile(path);
            }
          },
          explanation: "Ir hacia ahi",
          keys: ["Enter"],
        },

        onFocus: () => {
          setIndex(i);
          setHelperOptions(helperOptions);
        },
      };
    }
  );

  return (
    <Container
      css={{
        p: "0",
        m: "0",
        display: "flex",
        flexDirection: "row",
        h: "400px",
        ".virtualized-list": {
          width: "50%",
        },
      }}
    >
      <VirtualizedList list={listItems} />
      <Preview
        base64Img={(() => {
          const type = getTypeOfFile(files?.[index]?.extension);
          if (type === "IMAGE") {
            return `data:image/${files?.[index]?.extension.slice(1)};base64,${
              files?.[index]?.base64
            }`;
          } else if (type === "HTML") {
            return `data:image/svg+xml;base64,${files?.[index]?.base64}`;
          }
        })()}
        extension={files?.[index]?.extension}
        lastModified={files?.[index]?.info?.mtime}
        name={files?.[index]?.name}
        size={files?.[index]?.info?.size}
        path={files?.[index]?.path}
      />
    </Container>
  );
};

export default FileManager;
