import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/userSlice';
import authorReducer from '../features/authorSlice';
import postsReducer from '../features/postsSlice';
import selectedPostReducer from '../features/selectedPostsSlice';
import commentsReducer from '../features/commentSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    author: authorReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
