import { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../app/store';
import { selectUser } from '../selectedUser';
import { selectPost } from '../selectedPost';
import { clearComments } from '../commentsSlice';

export const deselectPostOnUserChange: Middleware =
  (store: MiddlewareAPI<AppDispatch, RootState>) => next => action => {
    const prevUser = store.getState().selectedUser.user;

    const result = next(action);

    if (selectUser.match(action)) {
      const nextUser = store.getState().selectedUser.user;

      const userChanged = prevUser?.id !== nextUser?.id;

      if (userChanged) {
        store.dispatch(selectPost(null));
        store.dispatch(clearComments());
      }
    }

    return result;
  };
