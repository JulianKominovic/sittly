import { Row } from "@nextui-org/react";
import React, { useState } from "react";
import { BsArrow90DegDown, BsArrow90DegUp, BsSave } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";
import useDatabase from "../../../hooks/useDatabase";
import Button from "../../../ui/button";
import Flex from "../../../ui/containers/Flex";
import Divider from "../../../ui/decoration/Divider";
import InputRadio from "../../../ui/form/InputRadio";
import InputText from "../../../ui/form/InputText";
import rescueFocusedElement from "../../../ui/utils/rescueFocusedElement";
import Preview from "../preview";
import { Command, CommandsStore } from "../store";

export enum PreConditionEnum {
  PREVIOUS_HAS_SUCCESS = "El comando anterior debe terminar con éxito",
  PREVIOUS_HAS_FAILED = "El comando anterior debe fallar",
  NO_PRE_CONDITION = "Sin pre-condicion (por defecto)",
}

export type CommandStep = {
  index: number;
  command: string;
  preCondition: PreConditionEnum;
};

const addStep = (index: number) => ({
  index: index,
  command: "echo 'example'",
  preCondition: PreConditionEnum.NO_PRE_CONDITION,
});

const CreateOrEditCommand = () => {
  const { updateContent, getContent } = useDatabase<CommandsStore>();
  const { id: commandID } = useParams();
  const command = getContent()?.commands.find((cmd) => cmd.id === commandID);
  const [steps, setSteps] = useState<CommandStep[]>(() =>
    command ? command.steps : [addStep(0)]
  );
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>(command ? command.title : "");
  const handleSaveToDatabase = () => {
    const content = getContent();
    const newItem = {
      id: command ? command.id : crypto.randomUUID(),
      steps,
      title,
      subtitle: "",
    };
    command
      ? updateContent({
          commands: content.commands.map((cmd) =>
            cmd.id === command.id ? newItem : cmd
          ),
        })
      : updateContent({
          commands: content.commands
            ? content.commands.concat(newItem)
            : [newItem],
        });

    navigate("../", {
      relative: "path",
    });
  };
  const handleSaveCommand = (value: string, index: number) => {
    setSteps((prev) => {
      return prev.map((step) =>
        step.index === index ? { ...step, command: value } : step
      );
    });
  };

  const handleAddStep = () => {
    setSteps((prev) => [...prev, addStep(steps.at(-1)?.index + 1)]);
  };
  const handleRemoveStep = (index: number) => {
    setSteps((prev) => {
      return prev
        .filter((step) => step.index !== index)
        .map((item, i) => ({ ...item, index: i }))
        .sort((a, b) => a!.index - b!.index);
    });
  };

  const handleMoveUp = (index: number) => {
    setSteps((prev) => {
      if (index === 0) return prev;

      return prev
        .map((step) => {
          if (step.index === index - 1) {
            return { ...step, index };
          }
          if (step.index === index) {
            return { ...step, index: index - 1 };
          }

          return step;
        })
        .sort((a, b) => a.index - b.index);
    });
  };
  const handleMoveDown = (index: number) => {
    setSteps((prev) => {
      if (index === steps.length - 1) return prev;

      return prev
        .map((step) => {
          if (step.index === index + 1) {
            return { ...step, index };
          }
          if (step.index === index) {
            return { ...step, index: index + 1 };
          }

          return step;
        })
        .sort((a, b) => a.index - b.index);
    });
  };
  const updatePrecondition = (index: number, condition: PreConditionEnum) =>
    setSteps((prev) =>
      prev.map((step) =>
        step.index === index ? { ...step, preCondition: condition } : step
      )
    );
  return (
    <>
      {steps.map((step) => {
        return (
          <div key={step.index + "item"} className="mb-5">
            <Divider
              styles={{ marginBottom: "mb-2" }}
              label={"Configuracion"}
            />
            <InputText
              onChange={(e) => setTitle(e.target.value)}
              id={step.index + ""}
              label={"Titulo"}
              value={title}
            />
            <Divider
              styles={{ marginBottom: "mb-2" }}
              label={"Paso - " + step.index}
            />
            <InputText
              onChange={(value) => handleSaveCommand(value, step.index)}
              id={step.index + ""}
              label={"Comando"}
              value={step.command}
            />
            <InputRadio
              defaultOption={0}
              id={`step${step.index}radio`}
              label="Precondicion"
              options={[
                {
                  title: "Sin condiciones",
                  description: PreConditionEnum.NO_PRE_CONDITION,
                  onChecked: () =>
                    updatePrecondition(
                      step.index,
                      PreConditionEnum.NO_PRE_CONDITION
                    ),
                },
                {
                  title: "Que falle el anterior",
                  description: PreConditionEnum.PREVIOUS_HAS_FAILED,
                  onChecked: () =>
                    updatePrecondition(
                      step.index,
                      PreConditionEnum.PREVIOUS_HAS_FAILED
                    ),
                },
                {
                  title: "Que el anterior tenga éxito",
                  description: PreConditionEnum.PREVIOUS_HAS_SUCCESS,
                  onChecked: () =>
                    updatePrecondition(
                      step.index,
                      PreConditionEnum.PREVIOUS_HAS_SUCCESS
                    ),
                },
              ]}
            />
            <Row
              wrap="nowrap"
              align="center"
              css={{ w: "100%", m: "0", gap: 16 }}
            >
              <Button flat onClick={handleAddStep} color="success">
                Agregar
              </Button>
              <Button
                flat
                onClick={() => {
                  handleRemoveStep(step.index);
                  rescueFocusedElement();
                }}
                color="error"
              >
                Eliminar
              </Button>
              <Button
                flat
                color="secondary"
                onClick={() => handleMoveUp(step.index)}
              >
                <BsArrow90DegUp />
              </Button>
              <Button
                flat
                color="secondary"
                onClick={() => handleMoveDown(step.index)}
              >
                <BsArrow90DegDown />
              </Button>
            </Row>
          </div>
        );
      })}
      <Preview steps={steps} />
      <Button
        styles={{
          width: "full",
          margin: "mt-2",
        }}
        onClick={handleSaveToDatabase}
      >
        Guardar <BsSave />
      </Button>
    </>
  );
};

export default CreateOrEditCommand;
