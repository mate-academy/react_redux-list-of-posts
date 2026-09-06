import { configureStore } from '@reduxjs/toolkit';
import { usersSlice } from './Users';
import { postsSlice } from './Posts';
import { commentsSlice } from './Comments';
import { authorSlice } from './Author';
import { selectedPostSlice } from './selectedPost';

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
/* eslint-enable @typescript-eslint/indent */
