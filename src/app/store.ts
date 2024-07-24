import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import UsersReducer from '../features/Users/usersSlice';
import PostsReducer from '../features/Posts/postsSlice';
import authorReducer from '../features/Author/authorSlice';
import commentsReducer from '../features/Comments/commentsSlice';
import selectedPostReducer from '../features/SelectedPost/selectedPostSlice';
import commentFormReducer from '../features/CommentForm/commentFormSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: UsersReducer,
    posts: PostsReducer,
    author: authorReducer,
    comments: commentsReducer,
    selecetedPost: selectedPostReducer,
    commentForm: commentFormReducer,
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
