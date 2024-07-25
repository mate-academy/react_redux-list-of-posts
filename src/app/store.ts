import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersSlice from '../users';
import authorSlice from '../author';
import postsSlice from '../posts';
import selectedPost from '../selectedPost';
import commentsSlice from '../comments';
import counterSlice from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    users: usersSlice,
    author: authorSlice,
    posts: postsSlice,
    selectedPost: selectedPost,
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
