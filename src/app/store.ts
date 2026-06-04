import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersReducer from '../features/users/usersSlice';
import authorReducer from '../features/author/authorSlice';
import postsReducer from '../features/posts/postsSlice';
import commentsSlice from '../features/comments/commentsSlice';
import currentPostSlice from '../features/selectedPost/selectedPost';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    author: authorReducer,
    posts: postsReducer,
    comments: commentsSlice,
    currentPost: currentPostSlice,
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
