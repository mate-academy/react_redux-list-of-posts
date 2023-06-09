import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/usersSlice';
import postsReducer from '../features/postsSlice';
import commentsReducer from '../features/commentsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
