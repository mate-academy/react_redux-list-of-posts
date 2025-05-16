import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { selectUser } from '../selectedUser';
import { clearPosts, loadPosts } from '../postsSlice';
import { AppDispatch } from '../../app/store';

export const loadPostOnUserSelect: Middleware =
  (store: MiddlewareAPI<AppDispatch>) => next => action => {
    const result = next(action);

    if (selectUser.match(action)) {
      const user = action.payload;

      if (user !== null) {
        store.dispatch(loadPosts(user.id));
      } else {
        store.dispatch(clearPosts());
      }
    }

    return result;
  };
