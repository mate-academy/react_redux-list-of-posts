import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as postsActions from '../../src/features/postsSlice';
import * as selectedPostAction from '../../src/features/selectedPostSlice';

export const usePostApp = () => {
  const dispatch = useAppDispatch();
  const {
    loaded,
    hasError,
    items: posts,
  } = useAppSelector(state => state.posts);

  const { author } = useAppSelector(state => state.author);
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  const loadUserPosts = useCallback(
    (userId: number) => {
      dispatch(postsActions.init(userId));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(selectedPostAction.setSelectedPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(postsActions.clearPosts());
    }
  }, [loadUserPosts, author, dispatch]);

  return { loaded, hasError, posts, author, selectedPost };
};
