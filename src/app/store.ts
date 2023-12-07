import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersSlice from '../features/usersSlice';
import postsSlise from '../features/postsSlice';
import commentsSlise from '../features/commentsSlise';

export const store = configureStore({
  reducer: {
    users: usersSlice,
    posts: postsSlise,
    comment: commentsSlise,
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
