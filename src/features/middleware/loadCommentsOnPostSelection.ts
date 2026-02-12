import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { AppDispatch } from '../../app/store';
import { selectPost } from '../selectedPost';
import { clearComments, loadComments } from '../commentsSlice';

export const loadCommentsOnPostSelect: Middleware =
  (store: MiddlewareAPI<AppDispatch>) => next => action => {
    const result = next(action);

    if (selectPost.match(action)) {
      const post = action.payload;

      if (post !== null) {
        store.dispatch(loadComments(post.id));
      } else {
        store.dispatch(clearComments());
      }
    }

    return result;
  };
