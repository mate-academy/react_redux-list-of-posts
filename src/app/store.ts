import { configureStore } from '@reduxjs/toolkit';
import { postsReducer } from '../features/postsSlice';
import { usersReducer } from '../features/usersSlice';
import authorReducer from '../features/authorSlice';
import selectedPostReducer from '../features/selectedPostSlice';
import { commentsReducer } from '../features/commentsSlice';

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    posts: postsReducer,
    users: usersReducer,
    author: authorReducer,
    selectedPost: selectedPostReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
