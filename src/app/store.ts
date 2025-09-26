import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postsSlice from '../features/post/postSlice';
import usersSlice from '../features/users/usersSlice';
import selectedPostSlice from '../features/selectedPost/selectedPostSlice';
import commentsSlice from '../features/comments/commentsSlice';
import authorSlice from '../features/author/authorSlice';

export const store = configureStore({
  reducer: {
    posts: postsSlice,
    author: authorSlice,
    users: usersSlice,
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
/* eslint-enable @typescript-eslint/indent */
