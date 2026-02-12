import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersSlice from '../features/counter/users/users';
import authorSlice from '../features/counter/author/author';
import postsSlice from '../features/posts/posts';
import selectedPostSlice from '../features/selectedPost/selectedPost';
import commentsSlice from '../features/comments/comments';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
