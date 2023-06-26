import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersSlice from '../features/users/usersSlice';
import authorSlice from '../features/author/authorSlice';
import postSlice from '../features/post/postsSlice';
import selectedPostSLice from '../features/selectedPost/selectedPost';
import newCommentFormSlice
  from '../features/newCommentForm/newCommentFormSlice';
import commentsSlice from '../features/comments/commentsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersSlice,
    author: authorSlice,
    posts: postSlice,
    selectedPost: selectedPostSLice,
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
