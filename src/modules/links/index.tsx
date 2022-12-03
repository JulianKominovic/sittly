import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import useDatabase from "../../hooks/useDatabase";
import useHelper from "../../hooks/useHelper";
import CreateOrEdit from "./modals/createOrEdit";
import LinkList from "./components/LinkList";
import { Link, SavedLinks } from "./types/Link";

type Props = {};

const LinkSaver = (props: Props) => {
  const { database, updateContent } = useDatabase<SavedLinks>();
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [editingLink, setEditingLink] = useState<null | Link>(null);

  const { setHelperOptions } = useHelper([
    {
      title: "General",
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
      ],
    },
  ]);

  return (
    <>
      <CreateOrEdit
        showPopup={showCreatePopup}
        setShowPopup={setShowCreatePopup}
        categories={Object.keys(database)}
        updateContent={updateContent}
        existingLink={editingLink}
        setEditingLink={setEditingLink}
      />
      <LinkList
        updateContent={updateContent}
        database={database}
        setEditingLink={setEditingLink}
        setHelperOptions={setHelperOptions}
        setShowCreatePopup={setShowCreatePopup}
      />
    </>
  );
};

export default LinkSaver;
