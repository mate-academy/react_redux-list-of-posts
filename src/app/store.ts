import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersRreducer from './usersSlice';
import authorRreducer from './authorSlice';
import postsRreducer from './postsSlice';
import commentsRreducer from './commentsSlice';
import selectedPostRreducer from './selectedPostSlice';

export const store = configureStore({
  reducer: {
    users: usersRreducer,
    author: authorRreducer,
    posts: postsRreducer,
    selectedPost: selectedPostRreducer,
    comments: commentsRreducer,
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
