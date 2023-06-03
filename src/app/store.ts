/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/usersSlice';
import authorReducer from '../features/authorSlice';
import postsReducer from '../features/postsSlice';
import currentPostReducer from '../features/selectedPostSlice';
import postCommentsReducer from '../features/commentsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    author: authorReducer,
    posts: postsReducer,
    currentPost: currentPostReducer,
    postComments: postCommentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
