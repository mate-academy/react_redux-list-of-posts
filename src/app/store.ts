import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersReducer from '../slices/UsersSlice';
import authorReducer from '../slices/AuthorSlice';
import postsReducer from '../slices/PostsSlice';
import selectedPostReducer from '../slices/SelectedPost';
import commentsReducer from '../slices/CommentsSlice';
import newCommentReducer from '../slices/NewCommentSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    author: authorReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
    comments: commentsReducer,
    newCommentForm: newCommentReducer,
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
