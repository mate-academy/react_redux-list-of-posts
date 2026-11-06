import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import postsReducer from './posts/posts';
import selectedPostReducer from './selectedPost/selectedPost';
import usersReducer from './users/users';
import authorReducer from './author/author';
import commentsReducer from './comments/comments';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    selectedPost: selectedPostReducer,
    users: usersReducer,
    author: authorReducer,
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
