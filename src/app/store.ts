import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './slices/usersSlice';
import { authorReducer } from './slices/authorSlice';
import { postsReducer } from './slices/postsSlice';
import { commentsReducer } from './slices/commentsSlice';
import { selectedPostReducer } from './slices/selectedPostSlice';

export const ReduxStore = configureStore({
  reducer: {
    users: usersReducer,
    author: authorReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof ReduxStore.getState>;
export type AppDispatch = typeof ReduxStore.dispatch;
