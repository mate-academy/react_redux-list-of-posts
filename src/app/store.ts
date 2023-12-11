import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import autorSlice from '../features/autorSlice';
import commentsSlice from '../features/commentsSlice';
import postsSlice from '../features/postsSlice';
import selectedPostSlice from '../features/selectedPost';
import usersSlice from '../features/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersSlice,
    author: autorSlice,
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
