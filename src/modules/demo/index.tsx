import React from "react";
import { BsAlarm } from "react-icons/bs";
import Divider from "../../ui/decoration/Divider";
import List from "../../ui/list";
import InputText from "../../ui/form/InputText";
import InputTextArea from "../../ui/form/InputTextArea";
import InputSelect from "../../ui/form/InputSelect";
import InputCheckbox from "../../ui/form/InputCheckbox";
import InputRadio from "../../ui/form/InputRadio";
import useAsync from "../../hooks/useAsync";

const TestComp = () => {
  const { doAsyncOperation } = useAsync();

  return (
    <List.Item
      action={{
        callback: () => {
          for (let index = 0; index < 20; index++) {
            doAsyncOperation(
              new Promise((res, rej) => {
                setTimeout(() => {
                  Math.random() > 0.5
                    ? res({ hola: "hola" })
                    : rej({ hola: "hola" });
                }, crypto.getRandomValues(new Uint16Array(1)) as any);
              })
            ).then((res) => console.log(res));
          }
        },
        explanation: "Detalles",
        keys: ["Enter"],
      }}
      title="List item"
      subtitle="list item again"
      icon={<BsAlarm />}
    ></List.Item>
  );
};

const TestCompX = () => (
  <List.Item
    action={{
      callback: () => console.log("CLICK"),
      explanation: "Detalles",
      keys: ["Enter"],
    }}
    title="List item"
    subtitle="list item again"
    icon={<BsAlarm />}
  ></List.Item>
);

const OPTIONS = [
  {
    value: "BMW",
    label: "😁 BMW",
    onClick: () => {},
  },
  {
    value: "MERCEDES",
    label: "😁 MERCEDES",
    onClick: () => {},
  },
];

const FlexDemo = ({}: {}) => {
  const { doAsyncOperation } = useAsync();
  return (
    <>
      <List.Root>
        <Divider label="Last executed" marginBottom={2} marginTop={2} />
        <TestComp />
        <Divider label="Frecuentes" marginBottom={2} marginTop={2} />
        <TestComp />
        <TestComp />
        <TestComp />
        <Divider label="Procesos" marginBottom={2} marginTop={2} />
        <TestComp />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <TestCompX />
          <TestCompX />
          <TestCompX />
        </div>
      </List.Root>
      <InputText
        id="test"
        label="Testing label"
        name="test"
        validations={[
          {
            errorMessage: "Opps length",
            validationFn: (value) => value.length < 10,
            severity: "error",
          },
          {
            errorMessage: "Opps cannot contain number 8",
            validationFn: (value) => value.includes("8"),
            severity: "warning",
          },
        ]}
      />
      <InputText
        id="test"
        label="Testing label"
        onChange={(v) => console.log(v)}
        validations={[
          {
            errorMessage: "Opps length",
            validationFn: (value) => value.length < 10,
            severity: "error",
          },
          {
            errorMessage: "Opps cannot contain number 8",
            validationFn: (value) => value.includes("8"),
            severity: "warning",
          },
        ]}
      />
      <InputSelect label="Select test" initialValue={"BMW"} options={OPTIONS} />
      <InputTextArea
        id="test"
        label="Testing label"
        validations={[
          {
            errorMessage: "Opps length",
            validationFn: (value) => value.length > 10,
            severity: "error",
          },
          {
            errorMessage: "Opps cannot contain number 8",
            validationFn: (value) => !value.includes("8"),
            severity: "warning",
          },
        ]}
      />
      <InputCheckbox
        id="dogs"
        label="Choose dogs"
        options={[
          {
            title: "Caniche",
            description: "Chiquitos y bonitos",
            onChecked: () => {},
          },
          {
            title: "Golder",
            description: "Grandotes y peludos",
            onChecked: () => {},
          },
        ]}
      />
      <InputRadio
        id="dogs-radio"
        label="Choose dogs"
        options={[
          {
            title: "Caniche",
            description: "Chiquitos y bonitos",
            onChecked: () => {
              doAsyncOperation(
                new Promise((res) => {
                  setTimeout(() => {
                    res({ hola: "hola" });
                  }, 4000);
                })
              ).then((res) => console.log(res));
            },
          },
          {
            title: "Golder",
            description: "Grandotes y peludos",
            onChecked: () => {
              doAsyncOperation<number>(
                new Promise((_res, rej) => {
                  setTimeout(() => {
                    rej(new Error("oops"));
                  }, 4000);
                })
              ).then((res) => console.log(res));
            },
          },
        ]}
      />
    </>
  );
};

export default FlexDemo;
