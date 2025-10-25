import { configureStore } from '@reduxjs/toolkit';
import authorReducer from '../features/selectedAuthor/selectedAuthorSlice';
import postsReducer from '../features/posts/postsSlice';
import selectedPostReducer from '../features/selectedPost/selectedPostSlice';
import usersReducer from '../features/users/usersSlice';
import commentsReducer from '../features/comments/commentsSlice';

export const store = configureStore({
  reducer: {
    author: authorReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
    users: usersReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
