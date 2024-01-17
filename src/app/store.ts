import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersSlice from '../features/usersSlice';
import authorSlice from '../features/authorSlice';
import postsSlice from '../features/postsSlice';
import postSlice from '../features/postSlice';
import commentsSlice from '../features/commentsSlice';

export const store = configureStore({
  reducer: {
    users: usersSlice,
    author: authorSlice,
    posts: postsSlice,
    selectedPost: postSlice,
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
