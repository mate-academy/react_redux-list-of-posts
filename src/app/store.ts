import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersReducer from './slices/usersSlice';
import postCommentsReducer from './slices/commentsSlice';
import postsReducer from './slices/postsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    comments: postCommentsReducer,
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
