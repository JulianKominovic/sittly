import React, { useState } from "react";
import { FiEdit, FiPlus } from "react-icons/fi";
import { IoGitNetworkOutline } from "react-icons/io5";
import { RiDeleteBin2Line } from "react-icons/ri";
import useDatabase from "../../hooks/useDatabase";
import useHelper from "../../hooks/useHelper";
import Divider from "../../ui/decoration/Divider";
import InputText from "../../ui/form/InputText";
import Modal from "../../ui/modal";
import LinkList from "./components/LinkList";
import Create from "./modals/create";
import { SavedLinks } from "./types/Link";

type Props = {};

const LinkSaver = (props: Props) => {
  const { database, updateContent } = useDatabase<SavedLinks>();
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [links, setLinks] = useState({});

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
      <Create
        showPopup={showCreatePopup}
        setShowPopup={setShowCreatePopup}
        categories={Object.keys(database)}
        updateContent={updateContent}
      />
      <LinkList
        links={database}
        setHelperOptions={setHelperOptions}
        setShowCreatePopup={setShowCreatePopup}
      />
    </>
  );
};

export default LinkSaver;
