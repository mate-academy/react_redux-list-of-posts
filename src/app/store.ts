import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { usersReducer } from '../features/users';
import { authorReducer } from '../features/author';
import { postsReducer } from '../features/posts';
import { postReducer } from '../features/post';
import { commentsReducer } from '../features/comments';
// eslint-disable-next-line import/no-cycle

export const store = configureStore({
  reducer: {
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
