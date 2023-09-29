import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authorSlice } from '../features/author';
import { postsSlice } from '../features/posts';
import { selectedPostSlice } from '../features/selectedPost';
import { usersSlice } from '../features/users';
import { commentsSlice } from '../features/comments';

export const store = configureStore({
  reducer: {
    author: authorSlice.reducer,
    posts: postsSlice.reducer,
    selectedPost: selectedPostSlice.reducer,
    users: usersSlice.reducer,
    comments: commentsSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
