import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersSlice from '../features/usersSlice';
import postsSlice from '../features/postsSlice';
import commentSlice from '../features/commentsSlice';

export const store = configureStore({
  reducer: {
    users: usersSlice,
    posts: postsSlice,
    comments: commentSlice,
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
