import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/users/users';
import userReducer from '../features/users/user';
import postsReducer from '../features/posts/posts';
import userPostReducer from '../features/posts/userPosts';
import selectedPostReducer from '../features/posts/selectedPost';
import commentsReducer from '../features/comments/comments';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    user: userReducer,
    posts: postsReducer,
    userPosts: userPostReducer,
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
