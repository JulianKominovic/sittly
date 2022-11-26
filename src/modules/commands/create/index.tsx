import React, { useState } from "react";
import { BsArrow90DegDown, BsArrow90DegUp } from "react-icons/bs";
import Button from "../../../ui/button";
import Flex from "../../../ui/containers/Flex";
import Divider from "../../../ui/decoration/Divider";
import InputRadio from "../../../ui/form/InputRadio";
import InputText from "../../../ui/form/InputText";

enum PreConditionEnum {
  PREVIOUS_HAS_SUCCESS = "El comando anterior debe terminar con éxito",
  PREVIOUS_HAS_FAILED = "El comando anterior debe fallar",
  NO_PRE_CONDITION = "Sin pre-condicion (por defecto)",
}

const addStep = (index: number) => ({
  index: index,
  command: "echo 'example'",
  preCondition: PreConditionEnum.NO_PRE_CONDITION,
});

const CreateCommand = () => {
  const [steps, setSteps] = useState<
    {
      index: number;
      command: string;
      preCondition: PreConditionEnum;
    }[]
  >(() => [addStep(0)]);

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
  console.log(steps);
  return (
    <div>
      {steps.map((step) => {
        return (
          <div key={step.index + "item"}>
            <Divider label={"Paso - " + step.index} />
            <InputText
              onChange={(value) => handleSaveCommand(value, step.index)}
              id={step.index + ""}
              label={"Comando"}
              value={step.command}
            />
            <InputRadio
              id={`step${step.index}radio`}
              label="Precondicion"
              options={[
                {
                  title: "Sin condiciones",
                  description: PreConditionEnum.NO_PRE_CONDITION,
                },
                {
                  title: "Que falle el anterior",
                  description: PreConditionEnum.PREVIOUS_HAS_FAILED,
                },
                {
                  title: "Que el anterior tenga éxito",
                  description: PreConditionEnum.PREVIOUS_HAS_SUCCESS,
                },
              ]}
            />
            <Flex
              styles={{
                gap: "gap-2",
                alignItems: "items-center",
              }}
            >
              <Button
                onClick={handleAddStep}
                styles={{
                  width: "full",
                }}
                color="green"
              >
                Agregar
              </Button>
              <Button
                onClick={() => handleRemoveStep(step.index)}
                styles={{
                  width: "full",
                }}
                color="red"
              >
                Eliminar
              </Button>
              <Button onClick={() => handleMoveUp(step.index)} color="sky">
                <BsArrow90DegUp />
              </Button>
              <Button color="sky" onClick={() => handleMoveDown(step.index)}>
                <BsArrow90DegDown />
              </Button>
            </Flex>
          </div>
        );
      })}
    </div>
  );
};

export default CreateCommand;
