import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import posts from '../features/posts';
import selectedPost from '../features/selectedPost';
import users from '../features/users';

export const store = configureStore({
  reducer: {
    users,
    posts,
    comments: selectedPost,
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
