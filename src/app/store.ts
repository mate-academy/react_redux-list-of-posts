import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';

import { usersReducer } from '../features/users/usersSlice';
import { authorReducer } from '../features/author/authorSlice';
import { postsReducer } from '../features/posts/postsSlice';
// eslint-disable-next-line max-len
import { selectedPostReducer } from '../features/selectedPost/selectedPostSlice';
import { commentsReducer } from '../features/comments/commentsSlice';

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
