import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersReducer from '../features/users/UsersSlice';
import authorRedudser from '../features/author/AuthorSlice';
import postsReducer from '../features/posts/PostsSlice';
import selectedPostReducer from '../features/selectedPost/selectedPostSlicer';
import commenstReducer from '../features/comments/CommentsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    author: authorRedudser,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
    comments: commenstReducer,
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
