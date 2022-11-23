import React, { useCallback, useMemo } from 'react';
import { InputStyles } from './FormElementsStyles';
import useInput, { useInputStoreProps } from './InputStore';
import InputTemplate from './InputTemplate';

export type Validation = {
  validationFn: (value: string) => boolean;
  errorMessage: string;
  severity: 'warning' | 'danger';
};

type Props = {
  label: string;
  id: string;
  validations?: Validation[];
  onChange?: (value: string) => void;
};

const validateInput = (
  value: string,
  validations: Validation[],
  setError: useInputStoreProps['setError'],
  clearError: useInputStoreProps['clearError']
): void => {
  const failingValidation: undefined | Validation = validations.find((validation) => validation.validationFn(value));
  if (failingValidation) {
    setError(failingValidation);
  } else {
    clearError();
  }
};

const InputText = (props: Props) => {
  const { id, validations, onChange }: Props = props;
  const { clearError, error, setError } = useInput();

  return (
    <InputTemplate {...props} error={error}>
      <input
        className={InputStyles(!!error)}
        type="text"
        name={id}
        id={id}
        onChange={(e) => {
          onChange?.(e.target.value);
          if (validations) validateInput(e.target.value, validations, setError, clearError);
        }}
      />
    </InputTemplate>
  );
};

export default InputText;
