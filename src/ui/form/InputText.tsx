import { FormElement, Input, InputProps, useInput } from "@nextui-org/react";
import React from "react";

export type Validation = {
  validationFn: (value: string) => boolean;
  errorMessage: string;
  severity: "warning" | "error";
};

const InputText = (
  props: Partial<InputProps> & { validations?: Validation[] }
) => {
  const { value, bindings } = useInput(props.initialValue ?? "");

  const helper = React.useMemo(() => {
    return props.validations?.find((validation) =>
      validation.validationFn(value)
    );
  }, [value]);
  return (
    <Input
      type="text"
      css={{
        mb: "$10",
        w: "100%",
      }}
      {...bindings}
      {...props}
      status={helper?.severity ?? "default"}
      color={helper?.severity ?? "default"}
      helperColor={helper?.severity ?? "default"}
      helperText={helper?.errorMessage ?? ""}
    />
  );
};

export default InputText;
