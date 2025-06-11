import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import users from '../slisers/users';
import user from '../slisers/user';
import posts from '../slisers/post';
import comments from '../slisers/comments';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: users,
    user: user,
    posts: posts,
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
