import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users';
import authorReducer from '../features/author';
import postReducer from '../features/posts';
import selectedPostReducer from '../features/selectedPost';
import commentsReducer from '../features/comments';

export const store = configureStore({
  reducer: {
    users: userReducer,
    author: authorReducer,
    posts: postReducer,
    selectedPost: selectedPostReducer,
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
