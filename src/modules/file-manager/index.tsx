import React, { useEffect, useMemo, useState } from "react";
import { AiFillFolderOpen } from "react-icons/ai";
import { RiFolderReceivedLine } from "react-icons/ri";
import { getIconForFile, getIconForFolder } from "vscode-icons-js";
import { File } from "../../../electron/types/file";
import useFileSystem from "../../hooks/useFileSystem";
import useHelper from "../../hooks/useHelper";
import useQuerybar from "../../hooks/useQuerybar";
import { AsyncStatusEnum } from "../../store/statusbarStore";
import VirtualizedList from "../../ui/list/VirtualizedList";
import rescueFocusedElement from "../../ui/utils/rescueFocusedElement";

type Props = {};

const FileManager = (props: Props) => {
  const { getFileInfo, getDirectoryFiles, findFile, getHomedir } =
    useFileSystem();
  const [files, setFiles] = useState<File[] | null>([]);
  const [relativePath, setRelativePath] = useState<string>("");
  const { value } = useQuerybar();
  const { setHelperOptions } = useHelper(null);

  const getDirs = async () => {
    const home = relativePath || (await getHomedir());
    const dirs = await getDirectoryFiles(home as string);

    if (dirs.status === AsyncStatusEnum.SUCCESS) {
      setFiles(dirs.data);
    }
    setRelativePath(home as string);
    rescueFocusedElement();
  };

  useEffect(() => {
    if (value) {
      findFile(value)
        .then((res) => {
          if (res.status === AsyncStatusEnum.SUCCESS) {
            setFiles(res.data);
          }
        })
        .catch((err) => console.log(err));
    } else {
      getDirs();
    }
  }, [value]);

  useEffect(() => {
    if (relativePath) getDirs();
  }, [relativePath]);

  const goBack = () => {
    setRelativePath((prev) => prev.replace(/([^\/]+)$/, ""));
  };
  console.log(files);
  return (
    <VirtualizedList
      list={
        files?.length > 0
          ? files?.map(({ extension, name, path, content, info }) => {
              return {
                title: name,
                subtitle: path,
                imageSrc: `/public/icons/${
                  extension === ""
                    ? getIconForFolder(name)
                    : getIconForFile(name)
                }`,
                divider: false,
                action: {
                  callback: () => {
                    if (!extension) {
                      setRelativePath(path);
                    }
                  },
                  explanation: "Ir hacia ahi",
                  keys: ["Enter"],
                },

                onFocus: () => {
                  setHelperOptions([
                    {
                      title: "Acciones",
                      items: [
                        {
                          title: extension === "" ? "Ir hacia ahi" : "Abrir",
                          description:
                            extension === ""
                              ? "Desplazarse hacia el directorio " + path
                              : "Abrir el archivo " + name,
                          key: "enter",
                          color: "default",
                          icon: <AiFillFolderOpen />,
                          onClick: () => {
                            setRelativePath(path);
                          },
                        },
                        ...(/\/home\/.*\/.+/.test(relativePath)
                          ? [
                              {
                                title: "Volver hacia atras",
                                description:
                                  "Volver hacia el directorio anterior.",
                                key: "go-back-folder",
                                icon: <RiFolderReceivedLine />,
                                onClick: () => {
                                  goBack();
                                },
                              },
                            ]
                          : []),
                      ],
                    },
                  ]);
                },
              };
            })
          : []
      }
    />
  );
};

export default FileManager;
