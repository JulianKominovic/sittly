import { Text, Modal } from "@nextui-org/react";
import React, { useEffect, useLayoutEffect } from "react";
import { useShowingModal } from "../../store/modalPopup";
import Button from "../button";
import rescueFocusedElement from "../utils/rescueFocusedElement";

type Props = {
  children: React.ReactNode;
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  cancelButton: {
    onClick: () => void;
    text: React.ReactNode;
  };
  acceptButton: {
    onClick: () => void;
    text: React.ReactNode;
  };
  title: string;
};

const NextModal = ({
  children,
  acceptButton,
  cancelButton,
  title,
  showPopup,
  setShowPopup: setExternalShowPopup,
}: Props) => {
  const setShowingModal = useShowingModal((state) => state.setShowingModal);
  const showingModal = useShowingModal((state) => state.showingModal);

  useEffect(() => {
    rescueFocusedElement();
    setShowingModal(showPopup);
  }, [showPopup]);
  useEffect(() => {
    rescueFocusedElement();
    setExternalShowPopup(showingModal);
  }, [showingModal]);

  const setShowPopup = (value: boolean) => {
    setExternalShowPopup(value);
    setShowingModal(value);
  };

  return showingModal ? (
    <Modal
      css={{
        m: "$10",
        h: "300px",
        borderRadius: "$xl",
        bg: "$backgroundAlpha",
        zIndex: "$5",
        border: "1px solid $accents0",
        backdropFilter: "blur(10px)",
      }}
      closeButton={false}
      aria-labelledby="modal-title"
      open={true}
      preventClose
    >
      <Modal.Header
        css={{
          bg: "$backgroundAlpha",
          py: "$2",
        }}
      >
        <Text id="modal-title" size={18}>
          {title}
        </Text>
      </Modal.Header>
      <Modal.Body
        css={{
          padding: "$10",
          bg: "$backgroundAlpha",
        }}
        autoMargin
      >
        {children}
      </Modal.Body>
      <Modal.Footer
        css={{
          d: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "$4",
          bg: "$backgroundAlpha",
        }}
      >
        <Button
          css={{
            w: "100%",
          }}
          color={"success"}
          flat
          onClick={() => {
            acceptButton.onClick();
            setShowPopup(false);
          }}
        >
          {acceptButton.text}
        </Button>
        <Button
          css={{
            w: "100%",
          }}
          flat
          color="error"
          onClick={() => {
            cancelButton.onClick();
            setShowPopup(false);
          }}
        >
          {cancelButton.text}
        </Button>
      </Modal.Footer>
    </Modal>
  ) : null;
};

export { NextModal as default };
