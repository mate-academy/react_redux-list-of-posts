import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUserPosts, clearPosts } from '../store/slices/postsSlice';
import {
  selectPosts,
  selectPostsLoaded,
  selectPostsError,
} from '../store/slices/postsSlice';
import { User } from '../types/User';

export const usePosts = (author: User | null) => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const isLoaded = useAppSelector(selectPostsLoaded);
  const hasError = useAppSelector(selectPostsError);

  useEffect(() => {
    if (author) {
      dispatch(fetchUserPosts(author.id));
    } else {
      dispatch(clearPosts());
    }
  }, [author, dispatch]);

  return {
    posts,
    isLoaded,
    hasError,
  };
};
