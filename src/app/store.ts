import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/counter/UserSlice';
import authorReducer from '../features/counter/AuthorSlice';
import postsReducer from '../features/counter/PostsSlice';
import selectedPostReducer from '../features/counter/SelectedPostSlice';
import commentsReducer from '../features/counter/CommentsSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    author: authorReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
