import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';

import usersReducer from './slices/usersSlice';
import postsReducer from './slices/postsSlice';
import authorReducer from './slices/authorSlice';
import selectedPostReducer from './slices/selectedPostSlice';
import commentsReducer from './slices/commentsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    author: authorReducer,
    selectedPost: selectedPostReducer,
    comments: commentsReducer,
    counter: counterReducer,
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
