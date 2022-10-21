import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import authorReducer from '../features/author/author';
import usersReducer from '../features/users/users';
import postReducer from '../features/posts/posts';
import selectedPostReducer from '../features/selectedPost/selectedPost';
import commentsReducer from '../features/comments/comments';

export const store = configureStore({
  reducer: {
    author: authorReducer,
    users: usersReducer,
    posts: postReducer,
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
