import { useState } from 'react';
import { Validation } from './InputText';

export type useInputStoreProps = {
  error: Validation | null;
  setError: (value: Validation) => void;
  clearError: () => void;
};

const useInput = () => {
  const [error, setError] = useState<null | Validation>(null);
  const setErrorState = (value: Validation) => setError(value);
  const clearError = () => setError(null);

  return {
    error,
    setError: setErrorState,
    clearError
  };
};

export default useInput;
