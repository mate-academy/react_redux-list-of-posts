import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersSlice from '../features/users/usersSlice';
import postsSlice from '../features/posts/postSlice';
import commentsSlice from '../features/comments/commentsSlice';
import selectionSlice from '../features/selection/selectionSlice';

export const store = configureStore({
  reducer: {
    users: usersSlice,
    posts: postsSlice,
    comments: commentsSlice,
    selection: selectionSlice,
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
