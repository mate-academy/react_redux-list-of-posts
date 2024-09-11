import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import userSlice from '../slices/userSlice';
import postSlice from '../slices/postSlice';
import commentSlice from '../slices/commentSlice';
import selectedPostSlice from '../slices/selectedPostSlice';
import authorSlice from '../slices/authorSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
    comment: commentSlice,
    selectedPost: selectedPostSlice,
    author: authorSlice,
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
