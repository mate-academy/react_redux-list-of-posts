import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authorReducer from '../features/author';
import commentsReducer from '../features/comments';
import postsReducer from '../features/posts';
import selectedPostReducer from '../features/selectedPost';
import usersReducer from '../features/users';

export const store = configureStore({
  reducer: {
    author: authorReducer,
    comments: commentsReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
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
