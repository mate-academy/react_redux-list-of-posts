import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/UsersAPI/UsersAPI';
import authorReducer from '../features/AuthorAPI/AuthorAPI';
import postsReducer from '../features/PostsAPI/PostsAPI';
import currentPostReducer from '../features/CurrentPostAPI/CurrentPostAPI';
import commentsReducer from '../features/CommentsAPI/CommentsAPI';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    author: authorReducer,
    currentPost: currentPostReducer,
    posts: postsReducer,
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
