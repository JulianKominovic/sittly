import { TextareaProps } from "@nextui-org/react/types/textarea";
import { Textarea, useInput } from "@nextui-org/react";
import React from "react";

export type Validation = {
  validationFn: (value: string) => boolean;
  errorMessage: string;
  severity: "warning" | "error";
};

const InputTextArea = (
  props: Partial<TextareaProps> & { validations: Validation[] }
) => {
  const { value, bindings } = useInput(props.initialValue ?? "");

  const helper = React.useMemo(() => {
    return props.validations?.find((validation) =>
      validation.validationFn(value)
    );
  }, [value]);
  return (
    <Textarea
      {...bindings}
      {...props}
      css={{
        m: "0",
        mb: "$10",
        w: "100%",
        textarea: {
          m: "0!important",
          p: "$4",
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

export default InputTextArea;
