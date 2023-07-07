/* eslint-disable import/no-cycle */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/users/usersSlice';
import authorReducer from '../features/author/authorSlice';
import postsReducer from '../features/posts/postsSlice';
import postReducer from '../features/post/postSlice';
import commentsReducer from '../features/comments/commentsSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    users: usersReducer,
    author: authorReducer,
    posts: postsReducer,
    post: postReducer,
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
