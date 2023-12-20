import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import postsReducer from '../features/posts/userPostsSlice';
import usersReducer from '../features/users/usersSlice';
import authorReducer from '../features/author/authorSlice';
import commentsReducer from '../features/comments/commentsSlice';
import selectedPostReducer from '../features/selectedPost/selectedPostSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    author: authorReducer,
    comments: commentsReducer,
    selectedPost: selectedPostReducer,
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
