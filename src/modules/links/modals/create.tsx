import React, { useState } from "react";
import { BsGithub } from "react-icons/bs";
import InputSelect from "../../../ui/form/InputSelect";
import InputText from "../../../ui/form/InputText";
import Modal from "../../../ui/modal";
import { Link, SavedLinks } from "../types/Link";

type Props = {
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  categories: string[];
  updateContent: (content: (previous: SavedLinks) => SavedLinks) => void;
};

const DEFAULT_LINK: Link = {
  fav: false,
  icon: "?",
  id: crypto.randomUUID(),
  title: "",
  url: "",
  category: "",
};

const Create = ({
  showPopup,
  setShowPopup,
  categories,
  updateContent,
}: Props) => {
  const [newLink, setNewLink] = useState<Link>(DEFAULT_LINK);

  return (
    <Modal
      title="Guardar nuevo link"
      showPopup={showPopup}
      setShowPopup={setShowPopup}
      acceptButton={{
        onClick: () => {
          console.log("SAVE");
          updateContent((prev) => ({
            ...prev,
            [newLink.category]: [
              ...(prev[newLink.category] ? prev[newLink.category] : []),
              newLink,
            ],
          }));
        },
        text: "Aceptar",
      }}
      cancelButton={{
        onClick: () => {},
        text: "Cancelar",
      }}
    >
      <InputText
        value={newLink.title}
        onChange={(e) =>
          setNewLink((prev) => ({ ...prev, title: e.target.value }))
        }
        label="Titulo"
        placeholder="Introduce el titulo..."
      />
      <InputText
        label="Icono"
        placeholder="Un emoji o 2 letras..."
        value={newLink.icon}
        onChange={(e) =>
          setNewLink((prev) => ({ ...prev, icon: e.target.value }))
        }
        validations={[
          {
            errorMessage: "2 letras máximo o 1 emoji",
            severity: "error",
            validationFn: (value: string) => value.length > 2,
          },
        ]}
      />
      <InputSelect
        label="Categoría"
        noResult={{
          should: "ADD_OPTION",
          pushNewOption: (newValue) => {
            setNewLink((prev) => ({ ...prev, category: newValue }));
          },
        }}
        options={categories.map((category) => ({
          value: category,
          label: category,
          onClick: () => {
            setNewLink((prev) => ({ ...prev, category }));
          },
        }))}
      />
      <InputText
        type="url"
        label="URL"
        value={newLink.url}
        onChange={(e) =>
          setNewLink((prev) => ({ ...prev, url: e.target.value }))
        }
      />
    </Modal>
  );
};

export default Create;
