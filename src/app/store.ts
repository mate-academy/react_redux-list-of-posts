import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice'; // у тебя уже есть
import usersReducer from '../slices/usersSlice';
import authorReducer from '../slices/authorSlice';
import postsReducer from '../slices/postsSlice';
import selectedPostReducer from '../slices/selectedPostSlice';
import commentsReducer from '../slices/commentsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    author: authorReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
