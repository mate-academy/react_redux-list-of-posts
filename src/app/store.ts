import { configureStore } from '@reduxjs/toolkit';
import authorReducer from '../features/authorSlice';
import commentsReducer from '../features/commentsSlice';
import postsReducer from '../features/postsSlice';
import selectedPostReducer from '../features/selectedPostSlice';
import usersReducer from '../features/usersSlice';

export const store = configureStore({
  reducer: {
    author: authorReducer,
    comments: commentsReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
    users: usersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
