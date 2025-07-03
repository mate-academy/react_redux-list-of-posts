import { useAppDispatch, useAppSelector } from '../app/hooks';

export const usePostsList = () => {
  const dispatch = useAppDispatch();

  const { items: posts } = useAppSelector(state => state.posts);
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const selectedPostId = selectedPost?.id;

  return {
    dispatch,
    posts,
    selectedPostId,
  };
};
