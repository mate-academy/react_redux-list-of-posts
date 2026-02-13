import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersSlice from '../slices/usersSlice';
import authorSlice from '../slices/authorSlice';
import postsSlice from '../slices/postsSlice';
import SelectedPostSlice from '../slices/SelectedPostSlice';
import commentsSlice from '../slices/commentsSlice';

export const store = configureStore({
  reducer: {
    users: usersSlice,
    author: authorSlice,
    posts: postsSlice,
    selectedPost: SelectedPostSlice,
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
