import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../features/users';
import selectedPost from '../features/selectedPost';
import author from '../features/author';
import posts from '../features/posts';
import comments from '../features/comments';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    selectedPost,
    author,
    posts,
    comments,
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
