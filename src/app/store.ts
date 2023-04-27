import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';
import commentReducer from '../features/comments/commentsSlice';
import selectedPostReducer from '../features/selectedPost/selectedPostSlice';
import authorReducer from '../features/author/authorSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    comments: commentReducer,
    selectedPost: selectedPostReducer,
    author: authorReducer,
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
