import { configureStore } from '@reduxjs/toolkit';
import { authorReducer } from './authorSlice';
import { commentsReducer } from './commentsSlice';
import { postsReducer } from './postsSlice';
import { selectedPostReducer } from './selectedPostSlice';
import { usersReducer } from './usersSlice';

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
