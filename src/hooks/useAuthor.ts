import { useAppSelector } from '../app/hooks';

export const useAuthor = () => useAppSelector((store) => store.author);
