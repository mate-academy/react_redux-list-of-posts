import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersSlice from '../slices/users';
import postsSlice from '../slices/posts';
import selectedPostSlice from '../slices/selectedPost';
import authorSlice from '../slices/author';
import commentsSlice from '../slices/comments';

export const store = configureStore({
  reducer: {
    users: usersSlice,
    posts: postsSlice,
    selectedPost: selectedPostSlice,
    author: authorSlice,
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
