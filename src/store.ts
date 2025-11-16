import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import authorReducer from './authorSlice';
import postsReducer from './postsSlice';
import selectedPostReducer from './selectedPostSlice';
import commentsReducer from './commentsSlice';

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
