import React from "react";
import { BsWindow } from "react-icons/bs";
import { FiCopy, FiEdit, FiPlus } from "react-icons/fi";
import { IoOpen } from "react-icons/io5";
import { RiDeleteBin2Line } from "react-icons/ri";
import useClipboard from "../../../hooks/useClipboard";
import useOpenLink from "../../../hooks/useOpenLink";
import { HelperAction } from "../../../store/helperStore";
import Divider from "../../../ui/decoration/Divider";
import ListItem from "../../../ui/list/ListItem";
import { Link, SavedLinks } from "../types/Link";

type Props = {
  setHelperOptions: (options: HelperAction) => void;
  setShowCreatePopup: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingLink: React.Dispatch<React.SetStateAction<Link | null>>;
  database: SavedLinks;
  updateContent: (content: (previous: SavedLinks) => SavedLinks) => void;
};

const LinkList = ({
  database,
  setHelperOptions,
  setShowCreatePopup,
  setEditingLink,
  updateContent,
}: Props) => {
  const { openLink } = useOpenLink();
  const { write, pasteToCurrentWindow } = useClipboard();
  return (
    <>
      {Object.entries(database).map(([key, value], index) => {
        return (
          value.length > 0 && (
            <div key={key + index}>
              <Divider
                label={key}
                align="start"
                css={{
                  mb: "$10",
                  mt: "$10",
                }}
              />

              {value.map((v) => {
                return (
                  <ListItem
                    key={v.id}
                    title={v.title}
                    icon={v.icon}
                    action={{
                      callback: () => openLink(v.url),
                      explanation: "Abrir",
                      keys: ["Enter"],
                    }}
                    subtitle={v.url}
                    onFocus={() => {
                      setHelperOptions([
                        {
                          title: "Acciones",
                          items: [
                            {
                              title: "Crear",
                              color: "success",
                              textColor: "success",
                              key: "create",
                              description: "Crear un nuevo link",
                              icon: <FiPlus />,
                              onClick: () => setShowCreatePopup(true),
                              children: <></>,
                              keyboardShorcut: ["ControlLeft", "KeyX"],
                            },
                            {
                              title: "Editar",
                              color: "warning",
                              textColor: "warning",
                              key: "edit",
                              description: `Editar el comando`,
                              icon: <FiEdit />,
                              onClick: () => {
                                setEditingLink(v);
                                setShowCreatePopup(true);
                              },
                              children: <></>,
                              keyboardShorcut: ["ControlLeft", "KeyE"],
                            },
                            {
                              title: "Abrir",
                              color: "primary",
                              textColor: "primary",
                              key: "preview",
                              description: `Ver el comando`,
                              icon: <IoOpen />,
                              onClick: () => {},
                              children: <></>,
                              keyboardShorcut: ["ControlLeft", "KeyP"],
                            },
                            {
                              title: "Eliminar",
                              color: "error",
                              textColor: "error",
                              key: "delete",
                              description: `Eliminar el comando`,
                              icon: <RiDeleteBin2Line />,
                              onClick: () => {
                                updateContent((prev) => {
                                  return {
                                    ...prev,
                                    [key]: prev[key].filter(
                                      (el) => el.id !== v.id
                                    ),
                                  };
                                });
                              },
                              children: <></>,
                              keyboardShorcut: ["ControlLeft", "Delete"],
                            },
                          ],
                        },
                        {
                          title: "Clipboard",
                          items: [
                            {
                              title: "Copiar",
                              color: "primary",
                              textColor: "primary",
                              key: "copy",
                              description: `Copiar URL al portapapeles.`,
                              icon: <FiCopy />,
                              onClick: () => {
                                write(v.url);
                              },
                            },
                            {
                              title: "Pegar en la ventana actual",
                              color: "primary",
                              textColor: "primary",
                              key: "past-to-window",
                              description: `Pegar la url en la ventana actual.`,
                              icon: <BsWindow />,
                              onClick: () => {
                                pasteToCurrentWindow(v.url);
                              },
                            },
                          ],
                        },
                      ]);
                    }}
                  />
                );
              })}
            </div>
          )
        );
      })}
    </>
  );
};

export default LinkList;
