import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/userSlice/usersSlice';
import currentUserReducer from '../features/currentUser/currentUserSlice';
import postsReducer from '../features/postSlice/postsSlice';
import selectedPostReducer from '../features/selectedPost/selectedPostSlice';
import commentsReducer from '../features/commentSlice/commentsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    currentUser: currentUserReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
