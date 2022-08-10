import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import postsReducer from './postsSlice';
import postDetailsReducer from './postDetailsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    postDetails: postDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
