import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import users from '../slices/users.slice';
import author from '../slices/author.slice';
import posts from '../slices/posts.slice';
import selectedPost from '../slices/selectedPost.slice';
import comments from '../slices/comments.slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users,
    author,
    posts,
    selectedPost,
    comments,
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
