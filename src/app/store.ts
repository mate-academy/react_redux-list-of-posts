import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersSlice from '../features/users/usersSlice';
import authorSlice from '../features/author/authorSlice';
import selectedPostSlice from '../features/selectedPost/selectedPostSlice';
import newCommentFormSlice
  from '../features/newCommentForm/newCommentFormSlice';
import commentsSlice from '../features/comments/commentsSlice';
import postsSlice from '../features/posts/postsSlice';

export const store = configureStore({
  reducer: {
    users: usersSlice,
    author: authorSlice,
    posts: postsSlice,
    selectedPost: selectedPostSlice,
    comments: commentsSlice,
    newComment: newCommentFormSlice,
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
