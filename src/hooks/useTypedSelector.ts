import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store/index';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
