import { configureStore } from '@reduxjs/toolkit';
import {
  usersSlice,
  authorSlice,
  postsSlice,
  selectedPostSlice,
  commentsSlice,
} from '../features/slices';

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    author: authorSlice.reducer,
    posts: postsSlice.reducer,
    selectedPost: selectedPostSlice.reducer,
    comments: commentsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
