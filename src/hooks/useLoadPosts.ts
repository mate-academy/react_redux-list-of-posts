import { useCallback, useEffect } from 'react';
import { User } from '../types/User';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadPosts } from '../features/posts/postsSlice';
import { setSelectedPost } from '../features/selectedPost/selectedPostSlice';

export const useLoadPosts = (author: User | null) => {
  const { posts, loaded, hasError } = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();

  const loadUserPosts = useCallback(
    (userId: number) => {
      dispatch(loadPosts(userId));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (author) {
      loadUserPosts(author.id);
    }
  }, [author, loadUserPosts, dispatch]);

  return { posts, loaded, hasError };
};
