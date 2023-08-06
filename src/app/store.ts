import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import usersReducer from '../features/users/usersSlice';
import authorsReducer from '../features/users/authors';
import postsReducer from '../features/posts/posts';
import selectedPostReducer from '../features/posts/selectedPost';
import commentsReducer from '../features/comments/comments';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    authors: authorsReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
