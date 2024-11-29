// eslint-disable-next-line import/no-cycle
import usersReducer from '../features/users/usersSlice';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import counterReducer from '../features/counter/counterSlice';
import authorReducer from '../features/author/authorSlice';
import selectedPostReducer from '../features/selectedPost/selectedPostSlice';
import commentsReducer from '../features/comments/commentsSlice';
import postsReducer from '../features/posts/postsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    author: authorReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
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
