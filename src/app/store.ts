import authorReducer from '../features/author';
import currentPostReducer from '../features/currentPost';
import usersReducer from '../features/usersSlice';
import commentsReducer from '../features/commentsSlice';
import postsReducer from '../features/postList';
import userPostsReducer from '../features/userPostSlice';
import counterReducer from '../features/counter/counterSlice';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    selectedAuthor: authorReducer,
    comments: commentsReducer,
    posts: postsReducer,
    currentPost: currentPostReducer,
    userPosts: userPostsReducer,
    counter: counterReducer,
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
