import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/users/usersSlice';
import authorReducer from '../features/author/authorSlice';
import userPostsReducer from '../features/posts/postsSlice';
import selectedPostReducer from '../features/selectedPost/selectedPostSlice';
import postCommentsReducer from '../features/comments/commentsSlice';
import newCommentFormReducer
  from '../features/newCommentForm/newCommentFormSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    author: authorReducer,
    posts: userPostsReducer,
    selectedPost: selectedPostReducer,
    comments: postCommentsReducer,
    newCommentForm: newCommentFormReducer,
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
