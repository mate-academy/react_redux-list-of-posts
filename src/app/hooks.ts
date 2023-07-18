import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import React, { useRef } from 'react';
import type { RootState, AppDispatch } from './store';

// Use these hooks everywhere instead of useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClick = (event: React.MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick as unknown as EventListener);

    return () => {
      document.removeEventListener('click',
        handleClick as unknown as EventListener);
    };
  }, [ref]);

  return ref;
};
