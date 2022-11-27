import React, { useState } from "react";
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

  return (
    <>
      {commands?.map(({ id, title, subtitle, steps }) => (
        <ListItem
          key={id}
          title={title}
          subtitle={id}
          action={{
            callback: () => {
              executeCommand(calculateCommandOutput(steps));
            },
            explanation: "Ejecutar",
            keys: [KEYS.Enter],
          }}
          helperActions={[
            {
              callback: () => {
                navigate("edit/" + id);
              },
              title: "Editar",
              explanation: "Editar comando",
              icon: <FiEdit />,
              keys: [KEYS.ControlLeft, KEYS.keyE],
              subtitle: "Editar comando " + id,
              iconSize: "sm",
            },
            {
              callback: () => {
                handleDeleteCommand(id);
              },
              title: "Eliminar",
              explanation: "Vista previa",
              icon: <RiDeleteBin2Line />,
              keys: [KEYS.ControlLeft, KEYS.keyD],
              subtitle: "Eliminar comando " + id,
              iconSize: "sm",
            },
            {
              callback: () => {
                navigate("preview/" + id);
              },
              title: "Vista previa",
              explanation: "Vista previa",
              icon: <VscPreview />,
              keys: [KEYS.ControlLeft, KEYS.keyP],
              subtitle: "Vista previa " + id,
              iconSize: "sm",
            },
          ]}
        />
      ))}
      <Link to={"create"}>create</Link>
    </>
  );
};

export default Commands;
