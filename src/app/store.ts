import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userSlice from '../features/users/users';
import authorSlice from '../features/author/author';
import postsSlice from '../features/posts/posts';
import selectedPostSlice from '../features/selectedPost/selectedPost';
import commentsSlice from '../features/comments/comments';

export const store = configureStore({
  reducer: {
    users: userSlice,
    author: authorSlice,
    posts: postsSlice,
    selectedPost: selectedPostSlice,
    comments: commentsSlice,
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
