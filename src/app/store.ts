import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersReducer from '../features/users/users';
import postsReducer from '../features/posts/posts';
import authorReducer from '../features/author/author';
import commentsReducer from '../features/comments/comments';
import selectedPostReducer from '../features/selectedPost';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    author: authorReducer,
    comments: commentsReducer,
    selectedPost: selectedPostReducer,
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
