import React, { useEffect, useState } from "react";
import InputSelect from "../../../ui/form/InputSelect";
import InputText from "../../../ui/form/InputText";
import Modal from "../../../ui/modal";
import { Link, SavedLinks } from "../types/Link";

type Props = {
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  categories: string[];
  updateContent: (content: (previous: SavedLinks) => SavedLinks) => void;
  existingLink: Link | null;
  setEditingLink: React.Dispatch<React.SetStateAction<Link | null>>;
};

const Create = ({
  showPopup,
  setShowPopup,
  categories,
  updateContent,
  existingLink,
  setEditingLink,
}: Props) => {
  const DEFAULT_LINK: Link = {
    fav: false,
    icon: "?",
    id: crypto.randomUUID(),
    title: "",
    url: "",
    category: "",
  };

  const [newLink, setNewLink] = useState<Link>(existingLink || DEFAULT_LINK);
  useEffect(() => {
    if (existingLink) setNewLink(existingLink);
    else setNewLink(DEFAULT_LINK);
  }, [existingLink, showPopup]);
  return (
    <Modal
      title="Guardar nuevo link"
      showPopup={showPopup}
      setShowPopup={setShowPopup}
      acceptButton={{
        onClick: () => {
          if (existingLink) {
            updateContent((prev) => {
              if (existingLink.category === newLink.category) {
                return {
                  ...prev,
                  [newLink.category]: prev[newLink.category]?.map((link) =>
                    link.id === newLink.id ? newLink : link
                  ),
                };
              } else {
                return {
                  ...prev,
                  [existingLink.category]: prev[existingLink.category].filter(
                    (item) => item.id !== newLink.id
                  ),
                  [newLink.category]:
                    prev[newLink.category]?.length > 0
                      ? prev[newLink.category].concat(newLink)
                      : [newLink],
                };
              }
            });
            setEditingLink(null);
            return;
          }
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
        onClick: () => {
          setShowPopup(false);
        },
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
        initialValue={newLink.category}
        options={categories.map((category) => {
          return {
            value: category,
            label: category,
            onClick: () => {
              console.log(category);
              setNewLink((prev) => ({ ...prev, category }));
            },
          };
        })}
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
