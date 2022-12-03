import React from "react";
import { FiEdit, FiPlus } from "react-icons/fi";
import { IoOpen } from "react-icons/io5";
import { RiDeleteBin2Line } from "react-icons/ri";
import useOpenLink from "../../../hooks/useOpenLink";
import { HelperAction } from "../../../store/helperStore";
import Divider from "../../../ui/decoration/Divider";
import ListItem from "../../../ui/list/ListItem";
import { SavedLinks } from "../types/Link";

type Props = {
  links: SavedLinks;
  setHelperOptions: (options: HelperAction) => void;
  setShowCreatePopup: React.Dispatch<React.SetStateAction<boolean>>;
};

const LinkList = ({ links, setHelperOptions, setShowCreatePopup }: Props) => {
  const { openLink } = useOpenLink();
  return (
    <>
      {Object.entries(links).map(([key, value], index) => {
        return (
          <div key={key + index}>
            <Divider label={key} />

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
                            onClick: () => {},
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
                            onClick: () => {},
                            children: <></>,
                            keyboardShorcut: ["ControlLeft", "Delete"],
                          },
                        ],
                      },
                    ]);
                  }}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default LinkList;
