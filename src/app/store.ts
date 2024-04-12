import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import userSlice from '../features/userSlice';
import authorSlice from '../features/authorSlice';
import postSlice from '../features/postSlice';
import selectedPostSlice from '../features/selectedPostSlice';
import commentSlice from '../features/commentSlice';

export const store = configureStore({
  reducer: {
    users: userSlice,
    author: authorSlice,
    posts: postSlice,
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
