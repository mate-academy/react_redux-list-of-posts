import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchPostComments,
  clearComments,
} from '../store/slices/commentsSlice';
import {
  selectComments,
  selectCommentsLoaded,
  selectCommentsError,
} from '../store/slices/commentsSlice';
import { Post } from '../types/Post';

export const useComments = (post: Post | null) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const isLoaded = useAppSelector(selectCommentsLoaded);
  const hasError = useAppSelector(selectCommentsError);

  useEffect(() => {
    if (post) {
      dispatch(fetchPostComments(post.id));
    } else {
      dispatch(clearComments());
    }

    return () => {
      dispatch(clearComments());
    };
  }, [post, dispatch]);

  return {
    comments,
    isLoaded,
    hasError,
  };
};
