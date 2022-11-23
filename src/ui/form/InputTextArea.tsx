import React from 'react';
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
  cols?: number;
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

const InputTextArea = (props: Props) => {
  const { id, validations, onChange, cols }: Props = props;
  const { clearError, error, setError } = useInput();
  return (
    <InputTemplate {...props} error={error}>
      <textarea
        className={`${InputStyles(
          !!error
        )} scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-800 scrollbar-rounded-lg focus:shadow-sm overflow-hidden resize-none`}
        name={id}
        id={id}
        rows={cols || 4}
        onChange={(e) => {
          onChange?.(e.target.value);
          if (validations) validateInput(e.target.value, validations, setError, clearError);
        }}
      />
    </InputTemplate>
  );
};

export default InputTextArea;
