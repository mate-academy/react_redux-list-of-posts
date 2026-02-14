import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import users from '../features/users';
import author from '../features/author';
import posts from '../features/posts';
import comments from '../features/comments';
import selectedPost from '../features/selectedPost';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users,
    author,
    posts,
    comments,
    selectedPost,
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
