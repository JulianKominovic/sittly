import { useQuerybarStore } from '../store/querybarStore';

const useQuerybar = () => {
  const setValue = useQuerybarStore((state) => state.setValue);
  const value = useQuerybarStore((state) => state.value);
  const placeholder = useQuerybarStore((state) => state.placeholder);
  const setPlaceholder = useQuerybarStore((state) => state.setPlaceholder);
  return {
    setValue,
    value,
    placeholder,
    setPlaceholder
  };
};

export default useQuerybar;
