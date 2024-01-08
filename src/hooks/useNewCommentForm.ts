import { useAppSelector } from '../app/hooks';

export const useNewCommentForm = () => {
  return useAppSelector(store => store.newCommentForm);
};
