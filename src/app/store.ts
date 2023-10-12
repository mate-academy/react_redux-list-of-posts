import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersSlice from './slices/usersSlice';
import postsSlice from './slices/postsSlice';
import commentsSlice from './slices/commentsSlice';

export const store = configureStore({
  reducer: {
    users: usersSlice,
    posts: postsSlice,
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
