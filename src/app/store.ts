import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersSlice from '../features/users/usersSlice';
import postsSlice from '../features/posts/postsSlice';
import commentsSlice from '../features/comments/commentsSlice';
import authorSlice from '../features/author/authorSlice';
import selectedPostSlice from '../features/selectedPost/selectedPostSlice';

export const store = configureStore({
  reducer: {
    users: usersSlice,
    posts: postsSlice,
    comments: commentsSlice,
    author: authorSlice,
    selectedPost: selectedPostSlice,
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
