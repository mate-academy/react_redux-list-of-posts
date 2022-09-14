import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { TRootState, TRootDispatch } from './store';

export const useAppDispatch = () => useDispatch<TRootDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
