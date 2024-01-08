import { useAppSelector } from '../app/hooks';

export const usePosts = () => useAppSelector((store) => store.posts);
