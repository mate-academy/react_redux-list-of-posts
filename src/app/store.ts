import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users';
import authorReducer from '../features/author';
import postsReducer from '../features/posts';
import selectedPostReducer from '../features/selectedPost';
import commentsReducer from '../features/comments';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    author: authorReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
