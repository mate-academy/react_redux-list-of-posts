// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';

// combine reducers here as we add more slices later
export const store = configureStore({
  reducer: {
    users: usersReducer,
    // author: authorReducer, posts: postsReducer, selectedPost: ..., comments: ...
  },
});

// TYPES for use in app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
