/* eslint-disable import/no-cycle */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authorReducer from '../features/AuthorSlice';
import usersReducer from '../features/UsersSlice';
import postsReducer from '../features/PostSlice';
import commentsReducer from '../features/CommentSlice';

export const store = configureStore({
  reducer: {
    author: authorReducer,
    users: usersReducer,
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
