import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import postsSlice from '../features/posts/posts';
import usersSlice from '../features/users/users';
import authorSlice from '../features/author/author';
import commentsSlice from '../features/comments/comments';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsSlice,
    users: usersSlice,
    author: authorSlice,
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
