import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { commentsReducer } from './slices/commentsSlice';
import { postsReducer } from './slices/postsSlice';
import { usersReducer } from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
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
