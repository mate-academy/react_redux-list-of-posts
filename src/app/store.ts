import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import authorReducer from '../features/author/author-slice';
import usersReducer from '../features/users/users-slice';
import postsReducer from '../features/posts/posts-slice';
import loadedReducer from '../features/loaded-slice/loaded-slice';
import hasErrorReducer from '../features/hasError/hasError-slice';
import postReducer from '../features/selectedPost/selectedpost-slice';
import commentsReducer from '../features/comment/comment-slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    author: authorReducer,
    users: usersReducer,
    posts: postsReducer,
    loaded: loadedReducer,
    hasError: hasErrorReducer,
    selectedPost: postReducer,
    selectedComments: commentsReducer,
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
