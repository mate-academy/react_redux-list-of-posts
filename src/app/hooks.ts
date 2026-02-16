import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Явно типізована функція без експорту інлайново
function useAppDispatchFn(): AppDispatch {
  return useDispatch<AppDispatch>();
}

export const useAppDispatch = useAppDispatchFn;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
