import { useEffect, useState } from "react";

const useDebounce = (value: string, debounceAmount: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceAmount);

    return () => clearTimeout(handler);
  }, [value, debounceAmount]);

  return debouncedValue;
};

export default useDebounce;
