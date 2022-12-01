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
  const helper = React.useMemo(() => {
    if (!props.value) return;
    return props.validations?.find((validation) =>
      validation.validationFn(props.value)
    );
  }, [props.value]);
  return (
    <Input
      type="text"
      {...props}
      value={props.value}
      onChange={(e) => {
        if (props.onChange) props.onChange(e);
      }}
      css={{
        w: "100%",
        mb: "$10",
        input: {
          padding: "$4!important",
          m: "0!important",
        },
        ...props.css,
      }}
      status={helper?.severity ?? "default"}
      color={helper?.severity ?? "default"}
      helperColor={helper?.severity ?? "default"}
      helperText={helper?.errorMessage ?? ""}
    />
  );
};

export default InputText;
