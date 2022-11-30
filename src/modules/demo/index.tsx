import React from "react";
import { BsAlarm, BsFillPauseBtnFill } from "react-icons/bs";
import { FiCopy } from "react-icons/fi";
import Flex from "../../ui/containers/Flex";
import Divider from "../../ui/decoration/Divider";
import List from "../../ui/list";
import InputText from "../../ui/form/InputText";
import InputTextArea from "../../ui/form/InputTextArea";
import InputSelect from "../../ui/form/InputSelect";
import { KEYS } from "../../lib/keys";
import InputCheckbox from "../../ui/form/InputCheckbox";
import InputRadio from "../../ui/form/InputRadio";
import useAsync from "../../hooks/useAsync";

const TestComp = () => {
  const { doAsyncOperation } = useAsync();

  return (
    <List.Item
      helperActions={[
        {
          callback: () => console.log("funciona el helper"),
          explanation: "Copiar",
          subtitle: "Copia esta app a tu portapapeles",
          keys: [KEYS.ControlLeft, KEYS.keyC],
          icon: <FiCopy />,
          title: "Copiar",
        },
        {
          callback: () => console.log("funciona el helper"),
          explanation: "Pegar",
          subtitle: "Pegar esta app a tu portapapeles",
          keys: [KEYS.ControlLeft, KEYS.keyV],
          icon: <BsFillPauseBtnFill />,
          title: "Copiar",
        },
      ]}
      id={Math.random().toString()}
      action={{
        callback: (props) => {
          for (let index = 0; index < 20; index++) {
            doAsyncOperation(
              new Promise((res, rej) => {
                setTimeout(() => {
                  Math.random() > 0.5
                    ? res({ hola: "hola" })
                    : rej({ hola: "hola" });
                }, crypto.getRandomValues(new Uint16Array(1)));
              })
            ).then((res) => console.log(res));
          }
        },
        explanation: "Detalles",
        keys: [KEYS.Enter],
      }}
      title="List item"
      subtitle="list item again"
      icon={<BsAlarm />}
    >
      <div className="flex items-center justify-between gap-2 mb-1 hover:background-secondary hover:outline-gray-700 rounded-lg hover:outline hover:outline-1 p-2 text-sm w-full focus:outline focus:outline-1 focus:outline-gray-700 focus:border-none">
        <p>Flame</p>
      </div>
    </List.Item>
  );
};

const TestCompX = () => (
  <List.Item
    id={Math.random().toString()}
    action={{
      callback: (props) => console.log(props),
      explanation: "Detalles",
      keys: [KEYS.Enter],
    }}
    title="List item"
    subtitle="list item again"
    icon={<BsAlarm />}
  >
    <div className="flex items-center justify-between gap-2 mb-1 hover:background-secondary hover:outline-gray-700 rounded-lg hover:outline hover:outline-1 p-2 text-sm w-full focus:outline focus:outline-1 focus:outline-gray-700 focus:border-none">
      <p>Flame</p>
    </div>
  </List.Item>
);

const OPTIONS = [
  {
    value: "BMW",
    display: () => <p>😁 BMW</p>,
  },
  {
    value: "MERCEDES",
    display: () => <p>😁 MERCEDES</p>,
  },
];

const FlexDemo = ({}: Props) => {
  const { doAsyncOperation } = useAsync();
  return (
    <>
      <List.Root>
        <Divider
          label="Last executed"
          styles={{
            marginBottom: "mb-3",
            marginTop: "mt-3",
          }}
        />
        <TestComp />
        <Divider
          label="Frecuentes"
          styles={{
            marginBottom: "mb-3",
            marginTop: "mt-3",
          }}
        />
        <TestComp />
        <TestComp />
        <TestComp />
        <Divider
          label="Procesos"
          styles={{
            marginBottom: "mb-3",
            marginTop: "mt-3",
          }}
        />
        <TestComp />
        <Flex>
          <TestCompX />
          <TestCompX />
          <TestCompX />
        </Flex>
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
      <InputSelect
        id="tt"
        label="Select test"
        onChange={(e) => console.log(e)}
        defaultValue={"BMW"}
        options={OPTIONS}
      />
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
