import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { usersReducer } from './slices/userSlice';
import { postReducer } from './slices/postSlice';
import commentsSlice from './slices/commentsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    comments: commentsSlice,
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
