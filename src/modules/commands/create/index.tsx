import { Col, Row, Text } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { BsArrow90DegDown, BsArrow90DegUp, BsSave } from "react-icons/bs";
import { VscPreview } from "react-icons/vsc";
import { useNavigate, useParams } from "react-router";
import useDatabase from "../../../hooks/useDatabase";
import useHelper from "../../../hooks/useHelper";
import Button from "../../../ui/button";
import Divider from "../../../ui/decoration/Divider";
import InputRadio from "../../../ui/form/InputRadio";
import InputText from "../../../ui/form/InputText";
import useRunCommand from "../hooks/useRunCommand";
import Preview from "../preview";
import { CommandsStore } from "../store";

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
  const { updateContent, database } = useDatabase<CommandsStore>();
  const { id: commandID } = useParams();
  const command = database?.commands?.find((cmd) => cmd.id === commandID);
  const [steps, setSteps] = useState<CommandStep[]>(() =>
    command ? command.steps : [addStep(0)]
  );
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>(() =>
    command ? command.title : ""
  );
  const [icon, setIcon] = useState<string>(() => (command ? command.icon : ""));

  const { calculatedCommandOutput, testCommand } = useRunCommand({
    externalSteps: steps,
  });

  const { setHelperOptions } = useHelper([
    {
      title: "Acciones",
      items: [
        {
          title: "Guardar comando",
          key: "save",
          color: "success",
          textColor: "success",
          description: "Guardar los cambios",
          icon: <BsSave />,
          onClick: () => handleSaveToDatabase(),
          children: <></>,
        },
        {
          title: "Ejecutar comando",
          key: "execute",
          color: "primary",
          textColor: "primary",
          description: "Ejecutar el código",
          icon: <VscPreview />,
          onClick: () => testCommand(),
          children: <></>,
        },
      ],
    },
  ]);

  const handleSaveToDatabase = () => {
    const newItem = {
      id: command ? command.id : crypto.randomUUID(),
      steps,
      title,
      subtitle: "",
      icon,
    };
    command
      ? updateContent((content) => ({
          commands: content.commands.map((cmd) =>
            cmd.id === command.id ? newItem : cmd
          ),
        }))
      : updateContent((content) => ({
          commands: content.commands
            ? content.commands.concat(newItem)
            : [newItem],
        }));

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
    <Row
      css={{
        mx: "0",
        gap: "$6",
      }}
    >
      <Col>
        <Text h4>Configuracion</Text>{" "}
        <InputText
          onChange={(e) => {
            setIcon(e.target.value);
          }}
          label={"Icon"}
          validations={[
            {
              severity: "error",
              errorMessage: "Solo puede ser un ícono o 2 letras",
              validationFn: (value = "") => {
                console.log(value.length);
                return value.length > 2;
              },
            },
          ]}
          value={icon}
        />
        <InputText
          onChange={(e) => setTitle(e.target.value)}
          label={"Titulo"}
          value={title}
        />
        {steps.map((step) => {
          return (
            <div key={step.index + "item"} className="mb-5">
              <Divider label={"Paso - " + step.index} />
              <InputText
                onChange={(e) => handleSaveCommand(e.target.value, step.index)}
                id={step.index + ""}
                label={"Comando"}
                value={step.command}
                css={{ m: "0" }}
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
                <Button
                  flat
                  css={{ width: "25%", my: "$8", minWidth: "unset" }}
                  onClick={handleAddStep}
                  color="success"
                >
                  Agregar
                </Button>
                <Button
                  flat
                  css={{ width: "25%", my: "$8", minWidth: "unset" }}
                  onClick={() => {
                    handleRemoveStep(step.index);
                  }}
                  color="error"
                >
                  Eliminar
                </Button>
                <Button
                  flat
                  css={{ width: "25%", my: "$8", minWidth: "unset" }}
                  color="secondary"
                  onClick={() => handleMoveUp(step.index)}
                >
                  <BsArrow90DegUp />
                </Button>
                <Button
                  flat
                  css={{ width: "25%", my: "$8", minWidth: "unset" }}
                  color="secondary"
                  onClick={() => handleMoveDown(step.index)}
                >
                  <BsArrow90DegDown />
                </Button>
              </Row>
            </div>
          );
        })}
      </Col>
      <Col
        css={{
          position: "sticky",
          top: "0",
        }}
      >
        <Text h4>Preview</Text>
        <Preview calculatedCommandOutput={calculatedCommandOutput} />
      </Col>
    </Row>
  );
};

export default CreateOrEditCommand;
