import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import userSlice from '../features/userSlice';
import authorSlice from '../features/authorSlice';
import postsSlice from '../features/postsSlice';
import selectedPostSlice from '../features/selectedPostSlice';
import commentsSlice from '../features/commentsSlice';

export const store = configureStore({
  reducer: {
    users: userSlice,
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
