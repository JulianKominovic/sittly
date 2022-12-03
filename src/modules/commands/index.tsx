import { Container, Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FiCopy, FiDelete, FiEdit, FiPlus } from "react-icons/fi";
import { IoCreate } from "react-icons/io5";
import { RiDeleteBin2Line } from "react-icons/ri";
import { VscPreview, VscSearchStop } from "react-icons/vsc";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useNavigation,
} from "react-router";
import { Link } from "react-router-dom";
import useClipboard from "../../hooks/useClipboard";
import useDatabase from "../../hooks/useDatabase";
import useExecCommand from "../../hooks/useExecCommand";
import useHelper from "../../hooks/useHelper";
import useQuerybar from "../../hooks/useQuerybar";
import { KEYS } from "../../lib/keys";
import ListItem from "../../ui/list/ListItem";
import NoResultsSearch from "../../ui/screen/NoResultsSearch";
import calculateCommandOutput from "./logic/calculateCommandOutput";
import { CommandsStore } from "./store";

const Commands = () => {
  const { executeCommand } = useExecCommand();
  const { database, updateContent } = useDatabase<CommandsStore>();
  const [commands, setCommands] = useState<CommandsStore["commands"]>(
    () => database?.commands
  );
  const { write } = useClipboard();
  const navigate = useNavigate();

  const handleDeleteCommand = (commandID: string) => {
    updateContent(() => ({
      commands: commands.filter((cmd) => cmd.id !== commandID),
    }));
    setCommands(database.commands);
  };

  const { setHelperOptions } = useHelper([
    {
      title: "Acciones",
      items: [
        {
          title: "Crear",
          color: "success",
          textColor: "success",
          key: "create",
          description: "Crear un nuevo comando",
          icon: <FiPlus />,
          onClick: () => navigate("create/"),
          children: <></>,
          keyboardShorcut: ["ControlLeft", "KeyX"],
        },
      ],
    },
  ]);

  const { value } = useQuerybar();

  const filteredCommands = commands?.filter((c) =>
    new RegExp(value, "i").test(c.title)
  );

  if (!filteredCommands || filteredCommands?.length < 1)
    return <NoResultsSearch searchValue={value} />;
  return (
    <>
      {filteredCommands.map(({ id, title, subtitle, steps, icon }) => (
        <ListItem
          key={id}
          title={title}
          subtitle={id}
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
                    description: "Crear un nuevo comando",
                    icon: <FiPlus />,
                    onClick: () => navigate("create/"),
                    children: <></>,
                    keyboardShorcut: ["ControlLeft", "KeyX"],
                  },
                  {
                    title: "Editar",
                    color: "warning",
                    textColor: "warning",
                    key: "edit",
                    description: `Editar el comando '${title}'`,
                    icon: <FiEdit />,
                    onClick: () => navigate("edit/" + id),
                    children: <></>,
                    keyboardShorcut: ["ControlLeft", "KeyE"],
                  },
                  {
                    title: "Viste previa",
                    color: "primary",
                    textColor: "primary",
                    key: "preview",
                    description: `Ver el comando '${title}'`,
                    icon: <VscPreview />,
                    onClick: () => navigate("preview/" + id),
                    children: <></>,
                    keyboardShorcut: ["ControlLeft", "KeyP"],
                  },
                  {
                    title: "Eliminar",
                    color: "error",
                    textColor: "error",
                    key: "delete",
                    description: `Eliminar el comando '${title}'`,
                    icon: <RiDeleteBin2Line />,
                    onClick: () => handleDeleteCommand(id),
                    children: <></>,
                    keyboardShorcut: ["ControlLeft", "Delete"],
                  },
                ],
              },
              {
                title: "Usuario",
                items: [
                  {
                    title: "Copiar",
                    color: "primary",
                    textColor: "primary",
                    key: "copy",
                    description: "Copiar comando",
                    icon: <FiCopy />,
                    onClick: () => write(calculateCommandOutput(steps)),
                    children: <></>,
                    keyboardShorcut: ["ControlLeft", "KeyC"],
                  },
                ],
              },
            ]);
          }}
          icon={icon}
          action={{
            callback: () => {
              executeCommand(calculateCommandOutput(steps));
            },
            explanation: "Ejecutar",
            keys: ["Enter"],
          }}
        />
      ))}
    </>
  );
};

export default Commands;
