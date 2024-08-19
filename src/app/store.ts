import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { postsReducer } from '../features/posts';
import { usersReducer } from '../features/users';
import { authorReducer } from '../features/author';
import { selectedPostReducer } from '../features/selectedPost';
import { commentsReducer } from '../features/comments';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    author: authorReducer,
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
