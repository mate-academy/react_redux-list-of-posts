import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppThunkDispatch } from './store';

// Use these hooks everywhere instead of useDispatch and useSelector
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
