import React, { useEffect, useState } from "react";
import { FiDelete, FiEdit } from "react-icons/fi";
import { IoCreate } from "react-icons/io5";
import { RiDeleteBin2Line } from "react-icons/ri";
import { VscPreview } from "react-icons/vsc";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useNavigation,
} from "react-router";
import { Link } from "react-router-dom";
import useDatabase from "../../hooks/useDatabase";
import useExecCommand from "../../hooks/useExecCommand";
import useHelper from "../../hooks/useHelper";
import { KEYS } from "../../lib/keys";
import ListItem from "../../ui/list/ListItem";
import calculateCommandOutput from "./logic/calculateCommandOutput";
import { CommandsStore } from "./store";

const Commands = () => {
  const { executeCommand } = useExecCommand();
  const { getContent, updateContent } = useDatabase<CommandsStore>();
  const [commands, setCommands] = useState<CommandsStore["commands"]>(
    () => getContent()?.commands
  );
  const navigate = useNavigate();

  const handleDeleteCommand = (commandID: string) => {
    updateContent({
      commands: commands.filter((cmd) => cmd.id !== commandID),
    });
    setCommands(getContent().commands);
  };

  const { setHelperOptions } = useHelper(null);

  return (
    <>
      {commands?.map(({ id, title, subtitle, steps }) => (
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
                    title: "Editar",
                    color: "warning",
                    textColor: "warning",
                    key: "edit",
                    description: "Editar el comando " + id,
                    icon: <FiEdit />,
                    onClick: () => navigate("edit/" + id),
                    children: <></>,
                  },
                  {
                    title: "Eliminar",
                    color: "error",
                    textColor: "error",
                    key: "delete",
                    description: "Eliminar el comando " + id,
                    icon: <RiDeleteBin2Line />,
                    onClick: () => handleDeleteCommand(id),
                    children: <></>,
                  },
                  {
                    title: "Viste previa",
                    color: "primary",
                    textColor: "primary",
                    key: "preview",
                    description: "Ver el comando " + id,
                    icon: <VscPreview />,
                    onClick: () => navigate("preview/" + id),
                    children: <></>,
                  },
                ],
              },
            ]);
          }}
          action={{
            callback: () => {
              executeCommand(calculateCommandOutput(steps));
            },
            explanation: "Ejecutar",
            keys: [KEYS.Enter],
          }}
        />
      ))}
      <Link to={"create"}>create</Link>
    </>
  );
};

export default Commands;
