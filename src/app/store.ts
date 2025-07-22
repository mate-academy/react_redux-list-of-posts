import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersSlice from '../features/users/usersSlice';
import postsSlice from '../features/posts/postsSlice';
import commentsSlice from '../features/comments/commentsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
