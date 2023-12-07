/* eslint-disable import/no-cycle */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import commentsReducer from '../features/commentsSlice';
import usersReducer from '../features/usersSlice';
import postsReducer from '../features/postsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    comments: commentsReducer,
    users: usersReducer,
    posts: postsReducer,
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
