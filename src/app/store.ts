import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import postsReducer from '../features/posts/postSlice';
import usersReducer from '../features/users/UsersSlice';
import authorReducer from '../features/author/authorSlice';
import selectedPostReducer from '../features/selectedPost/selectedPost';
import commentReducer from '../features/comments/comments';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    users: usersReducer,
    author: authorReducer,
    selectedPost: selectedPostReducer,
    comment: commentReducer,
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
