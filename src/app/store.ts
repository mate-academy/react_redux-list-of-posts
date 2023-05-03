import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../slices/users';
import selectedPostReducer from '../slices/selectedPost';
import postsReducer from '../slices/posts';
import authorReducer from '../slices/author';
import commentsReducer from '../slices/comments';

export const store = configureStore({
  reducer: {
    author: authorReducer,
    comments: commentsReducer,
    selectedPost: selectedPostReducer,
    users: usersReducer,
    posts: postsReducer,
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
