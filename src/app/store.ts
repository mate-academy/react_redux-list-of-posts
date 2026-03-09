import { configureStore, ThunkAction, Action, combineSlices } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle

import counterReducer from '../features/counter/counterSlice';
import usersSlice from '../features/usersApi'
import authorSlice from '../features/authorApi'
import postsSlice  from '../features/postsApi';
import commentsSlice from '../features/commentsApi';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersSlice,
    author: authorSlice,
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
