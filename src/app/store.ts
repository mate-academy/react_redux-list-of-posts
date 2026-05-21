import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authorSlice from '../features/author/authorSlice';
import UsersSlice from '../features/users/usersSlice';
import postsSlice from '../features/posts/postsSlice';
import selectedPostSlice from '../features/selectedPost/selectedPostSlice';
import commentsSlice from '../features/comments/commentsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    author: authorSlice,
    users: UsersSlice,
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
