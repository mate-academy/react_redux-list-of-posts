import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersSlice from './../features/users/usersSlice';
import authorSlice from './../features/author/authorSlice';
import postsSlice from './../features/posts/postsSlice';
import commentsSlice from './../features/comments/commentsSlice';
import selectedPostSlice from './../features/selectedPost/selectedPost';

export const store = configureStore({
  reducer: {
    users: usersSlice,
    author: authorSlice,
    posts: postsSlice,
    selectedPost: selectedPostSlice,
    comments: commentsSlice,
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
