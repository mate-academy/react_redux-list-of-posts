import { useState } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useLocalStorage<T>(
  key: string, initValue: T,
) {
  const [value, setValue] = useState(() => {
    const data = localStorage.getItem(key);

    if (data === null) {
      return initValue;
    }

    try {
      return JSON.parse(data);
    } catch {
      return initValue;
    }
  });

  const addToStorage = (newValue: T) => {
    if (!newValue) {
      localStorage.removeItem(key);
    }

    localStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  };

  return [value, addToStorage];
}
