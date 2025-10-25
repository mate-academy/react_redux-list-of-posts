/* eslint-disable import/extensions */
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/slices/postsSlice';
import selectedPostReducer from '../features/slices/SelectedPostSlice';
import usersReducer from '../features/slices/usersSlice';
import commentsReducer from '../features/slices/commentsSlice';
/* eslint-enable import/extensions */

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
