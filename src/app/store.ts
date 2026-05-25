import { configureStore } from '@reduxjs/toolkit';
import authorReducer from '../features/author/authorSlice';
import usersReducer from '../features/users/usersSlice';
import postsReducer from '../features/posts/postsSlice';
import commentsReducer from '../features/comments/commentsSlice';
import selectedPostReducer from '../features/selectedPost/selectedPostSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
    selectedPost: selectedPostReducer,
    author: authorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
