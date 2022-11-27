import React, { Ref, useEffect, useRef, useState } from "react";
import { BsArrowDownCircleFill } from "react-icons/bs";
import { KEYS } from "../../lib/keys";
import Keystroke from "../Keystroke";
import { focusedClasses, hoverClasses } from "../styles";
import { InputStyles } from "./FormElementsStyles";
import useInput from "./InputStore";
import InputTemplate from "./InputTemplate";

export type Validation = {
  validationFn: (value: string) => boolean;
  errorMessage: string;
  severity: "warning" | "danger";
};

type Option = {
  value: string;
  display: React.ReactNode | JSX.Element;
  onSelect: () => void;
};

type Props = {
  label: string;
  id: string;
  defaultValue: string;
  options: Option[];
  onChange?: (value: string) => void;
};

type OptionProps = {
  setOpenOptions: React.Dispatch<React.SetStateAction<boolean>>;
  opt: Option;
  setSelectedOption: React.Dispatch<React.SetStateAction<Option>>;
  selectedOption: Option;
  options: Option[];
  parentRef: Ref<HTMLButtonElement>;
  onSelect: (props: Omit<Option, "onSelect">) => void;
} & Props;

function SelectOption({
  opt,
  setSelectedOption,
  onChange,
  setOpenOptions,
  selectedOption,
  id,
  parentRef,
  onSelect,
}: OptionProps) {
  return (
    <button
      ref={(e) => opt.value === selectedOption.value}
      className={`flex items-center gap-2 px-2 rounded-lg min-h-[36px] ${focusedClasses()} border-color-opaque ${hoverClasses()} w-full`}
      onClick={() => {
        parentRef.current.focus();
        setSelectedOption({ display: opt.display, value: opt.value });
        onChange?.(String(opt.value));
        setOpenOptions(false);
        onSelect?.({ display: opt.display, value: opt.value });
      }}
      role="option"
      aria-selected={selectedOption.value === opt.value}
      value={opt.value}
      key={id + opt.value}
    >
      <input
        readOnly
        tabIndex={-1}
        type="checkbox"
        className="rounded-md appearance-none block w-2 h-2 background-secondary  checked:bg-yellow-500 checked:border checked:border-yellow-400"
        checked={selectedOption.value === opt.value}
      />
      {typeof opt.display === "function" ? opt.display() : opt.display || null}
    </button>
  );
}

const InputSelect = (props: Props) => {
  const { id, defaultValue, options }: Props = props;
  const { error } = useInput();
  const optionDisplayRef = useRef<null | HTMLButtonElement>(null);
  const [openOptions, setOpenOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option>(() => {
    if (defaultValue) {
      const matchingValue = options.find((opt) => opt.value === defaultValue);
      return {
        display: matchingValue?.display || <p>Default</p>,
        value: matchingValue?.value || "Default",
      };
    }
    return {
      display: options[0]?.display || <p>Default</p>,
      value: options[0]?.value || "Default",
    };
  });

  return (
    <InputTemplate {...props} error={error}>
      <input
        hidden
        type="text"
        className={InputStyles(!!error)}
        name={id}
        id={id}
      />

      <button
        ref={optionDisplayRef}
        role="option"
        aria-selected={openOptions}
        onClick={() => {
          setOpenOptions((prev) => !prev);
        }}
        tabIndex={0}
        className={`${InputStyles(
          false
        )} px-0 ${focusedClasses()} ${hoverClasses()}`}
      >
        <div className="flex gap-2 justify-between items-center px-2">
          {typeof selectedOption?.display === "function"
            ? selectedOption.display()
            : selectedOption.display || null}
          <aside className="flex gap-2 justify-between items-center">
            <Keystroke id={`open-${id}`} keys={[KEYS.Enter]} size="xs" />
            <BsArrowDownCircleFill />
          </aside>
        </div>
      </button>

      <ul
        className={`transition-all relative background-secondary ${
          openOptions ? "block" : "hidden"
        } p-2 rounded-md mt-1 `}
      >
        {options.map((opt: Option) => (
          <SelectOption
            {...props}
            key={id + opt.value}
            opt={opt}
            parentRef={optionDisplayRef}
            selectedOption={selectedOption}
            setOpenOptions={setOpenOptions}
            setSelectedOption={setSelectedOption}
            onSelect={opt.onSelect}
          />
        ))}
      </ul>
    </InputTemplate>
  );
};

export default InputSelect;
