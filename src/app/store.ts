import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import authorSlice from '../features/author/authorSlice';
import usersSlice from '../features/users/usersSlice';
import postsSlice from '../features/posts/postsSlice';
import selectedPostSlice from '../features/selectedPost/selectedPostSlice';
import commentSlice from '../features/comments/commentSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    author: authorSlice,
    users: usersSlice,
    posts: postsSlice,
    selectedPost: selectedPostSlice,
    comments: commentSlice,
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
