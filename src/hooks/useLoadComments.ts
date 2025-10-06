import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadAsyncComments } from '../features/comments/commentsSlice';
import { Comment } from '../types/Comment';

type UseLoadCommentsReturn = {
  items: Comment[];
  loaded: boolean;
  hasError: boolean;
};

export const useLoadComments = (postId: number): UseLoadCommentsReturn => {
  const { items, loaded, hasError } = useAppSelector(state => state.comments);
  const dispatch = useAppDispatch();

  // FIX: inline effect to avoid recreating a function each render
  useEffect(() => {
    dispatch(loadAsyncComments(postId));
  }, [postId, dispatch]);

  return { items, loaded, hasError };
};
