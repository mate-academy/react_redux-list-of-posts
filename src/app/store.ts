import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import authorReducer from '../features/posts/author';
import selectedPostReducer from '../features/posts/selectedPost';
import postsReducer from '../features/posts/posts';
import usersReducer from '../features/posts/users';
import commentssReducer from '../features/posts/comments';

export const store = configureStore({
  reducer: {
    author: authorReducer,
    selectedPost: selectedPostReducer,
    posts: postsReducer,
    users: usersReducer,
    comments: commentssReducer,
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
