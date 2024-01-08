import { useAppSelector } from '../app/hooks';

export const useComments = () => useAppSelector(store => store.comments);
