"use client";

import { useCallback, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [stored, setStored] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        setStored(value);
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {
        /* storage indisponivel */
      }
    },
    [key],
  );

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStored(initialValue);
    } catch {
      /* ignora */
    }
  }, [key, initialValue]);

  return [stored, setValue, remove] as const;
}
