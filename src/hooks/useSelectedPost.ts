import { useAppSelector } from '../app/hooks';

export const useSelectedPost = () => {
  return useAppSelector((store) => store.selectedPost);
};
