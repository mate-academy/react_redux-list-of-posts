import { useAppSelector } from '../app/hooks';

export const useUsers = () => useAppSelector(store => store.users);
