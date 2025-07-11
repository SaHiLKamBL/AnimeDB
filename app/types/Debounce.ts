'use client';

import { useEffect, useState } from 'react';

export const useDebounce = <T>(value: T, delay = 500): T => {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value]);

  return debounceValue;
};
