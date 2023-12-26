import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle

import userReducer from '../features/userSlice';
import commentsReducer from '../features/commentsSlice';
import postReducer from '../features/postSlice';

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    users: userReducer,
    posts: postReducer,
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
