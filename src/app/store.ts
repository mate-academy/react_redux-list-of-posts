import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/posts';
import authorReducer from '../features/author/author';
import commentsReducer from '../features/comments/comments';
import usersReducer from '../features/users/users';

// eslint-disable-next-line import/no-cycle

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    author: authorReducer,
    comments: commentsReducer,
    users: usersReducer,
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
