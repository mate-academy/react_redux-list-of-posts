import { configureStore } from '@reduxjs/toolkit';

import usersReducer from '../features/userSlice';
import postsReducer from '../features/postsSlice';
import commentsReducer from '../features/commentsSlice';
import authorReducer from '../features/authorSlice';
import selectedPostReducer from '../features/selectedPostSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
    author: authorReducer,
    selectedPost: selectedPostReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
