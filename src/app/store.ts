import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import UsersSlice from '../features/users/UsersSlice';
import AuthorSlice from '../features/author/AuthorSlice';
import PostsSlice from '../features/posts/PostsSlice';
import SelectedPostSlice from '../features/selectedPost/SelectedPostSlice';
import CommentsSlice from '../features/comments/CommentsSlice';
// eslint-disable-next-line max-len
import NewCommentFormSlice from '../features/NewCommentForm/NewCommentFormSlice';

export const store = configureStore({
  reducer: {
    users: UsersSlice,
    author: AuthorSlice,
    posts: PostsSlice,
    selectedPost: SelectedPostSlice,
    comments: CommentsSlice,
    newCommentForm: NewCommentFormSlice,
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
