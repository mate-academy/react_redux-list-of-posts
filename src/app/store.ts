import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authorSlice from '../features/authors/authorSlice';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import postsSlice from '../features/posts/postsSlice';
import usersSlice from '../features/users/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersSlice,
    author: authorSlice,
    posts: postsSlice,
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
