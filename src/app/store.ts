import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { usersSlice } from '../features/users-slice';
import { userSlice } from '../features/author-slice';
import { postsSlice } from '../features/posts-slice';
import { selectedPostSlice } from '../features/selectedPost-slice';
import { commentsSlice } from '../features/comments-slice';

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    user: userSlice.reducer,
    posts: postsSlice.reducer,
    post: selectedPostSlice.reducer,
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
