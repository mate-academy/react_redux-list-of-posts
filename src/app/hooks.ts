import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState } from './store';

// Use these hooks everywhere instead of useDispatch and useSelector
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAppDispatch = () => useDispatch<any>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
