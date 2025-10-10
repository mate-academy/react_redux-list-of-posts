import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { usersSlice } from '../features/users';
import { commentsSlice } from '../features/comments';
import { authorSlice } from '../features/author';
import { selectedPostSlice } from '../features/selectedPost';
import { postsSlice } from '../features/posts';

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    comments: commentsSlice.reducer,
    posts: postsSlice.reducer,
    author: authorSlice.reducer,
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
