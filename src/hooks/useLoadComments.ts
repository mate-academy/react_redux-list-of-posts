import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadAsyncComments } from '../features/comments/commentsSlice';

export const useLoadComments = (postId: number) => {
  const { comments, loaded, hasError } = useAppSelector(
    state => state.comments,
  );
  const dispatch = useAppDispatch();

  function loadComments() {
    dispatch(loadAsyncComments(postId));
  }

  useEffect(loadComments, [postId, dispatch]);

  return { comments, loaded, hasError };
};
