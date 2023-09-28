/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from './users/users-slice';
import authorReducer from './author/author-slice';
import postsReducer from './posts/post-slice';
import commentsReducer from './comments/comments-slice';

export const store: any = configureStore({
  reducer: {
    users: usersReducer,
    author: authorReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
