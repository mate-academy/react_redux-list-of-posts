import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authorSlice } from '../features/author';
import { commentsSlice } from '../features/comments';
// eslint-disable-next-line import/no-cycle
import { postsSlice } from '../features/posts';
import { selectedPostSlice } from '../features/selectedPost';
import { usersSlice } from '../features/users';

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    author: authorSlice.reducer,
    posts: postsSlice.reducer,
    comments: commentsSlice.reducer,
    selectedPost: selectedPostSlice.reducer,
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
