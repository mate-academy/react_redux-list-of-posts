// src/store/index.ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersSlice from './slices/usersSlice';
import postSlice from './slices/postsSlice';
import selectedPostSlice from './slices/selectedPostSlice';
import commentsSlice from './slices/commentsSlice';
import authorSlice from './slices/authorSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersSlice,
    posts: postSlice,
    selectedPost: selectedPostSlice,
    comments: commentsSlice,
    author: authorSlice,
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
