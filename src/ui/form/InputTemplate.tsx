import React from "react";
import { Validation } from "./InputText";

export type InputTemplateProps = {
  id: string;
  label: string;
  error: Validation | null;
  children: React.ReactNode;
};

const InputTemplate = ({ id, label, children, error }: InputTemplateProps) => {
  return (
    <hgroup className="flex flex-col ">
      <label
        className={`text-sm ${error ? "text-red-400" : "text-color-normal"}`}
        htmlFor={id}
      >
        {label}
      </label>
      {children}
      <span className="text-xs leading-loose text-red-400">
        {error?.errorMessage || "ㅤ"}
      </span>
    </hgroup>
  );
};

export default InputTemplate;
