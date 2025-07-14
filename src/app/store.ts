/* eslint-disable max-len */
/* eslint-enable @typescript-eslint/indent */
import { configureStore } from '@reduxjs/toolkit';

import usersReducer from '../features/counter/users/usersSlice';
import postsReducer from '../features/counter/posts/postsSlice';
import commentsReducer from '../features/counter/comments/commentsSlice';
import commentFormReducer from '../features/counter/commentForm/commentFormSlice';
import authorReduce from '../features/counter/author/authorSlice';
import selectedPostReducer from '../features/counter/selectedPost/selectedPostSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    author: authorReduce,
    posts: postsReducer,
    comments: commentsReducer,
    commentForm: commentFormReducer,
    selectedPost: selectedPostReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
