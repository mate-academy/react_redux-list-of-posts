import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../features/UsersSlice';
import authorReducer from '../features/author';
import postsReducer from '../features/posts';
import commentsReducer from '../features/comments';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    author: authorReducer,
    posts: postsReducer,
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
