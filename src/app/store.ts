import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import authorReducer from '../features/author/author-slice';
import usersReducer from '../features/users/users-slice';
import postsReducer from '../features/posts/posts-slice';
import postReducer from '../features/selectedPost/selectedpost-slice';
import commentsReducer from '../features/comment/comment-slice';

export const store = configureStore({
  reducer: {
    author: authorReducer,
    users: usersReducer,
    posts: postsReducer,
    selectedPost: postReducer,
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
