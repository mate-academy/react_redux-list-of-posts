import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import users from '../features/users';
import authorSlice from '../features/author';
import posts from '../features/posts';
import selectedPost from '../features/selectedPost';
import comments from '../features/comments';
// eslint-disable-next-line import/no-cycle

export const store = configureStore({
  reducer: {
    users: users,
    author: authorSlice,
    posts: posts,
    selectedPost: selectedPost,
    comments: comments,
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
