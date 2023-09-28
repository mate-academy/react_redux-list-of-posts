import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postSlice from '../features/postSlice';
import authorSlice from '../features/authorSlice';
import userSlice from '../features/userSlice';
import selectPostSlice from '../features/selectPostSlice';
import commentSlice from '../features/commentSlice';
// eslint-disable-next-line import/no-cycle

export const store = configureStore({
  reducer: {
    posts: postSlice,
    author: authorSlice,
    users: userSlice,
    selectedPost: selectPostSlice,
    comment: commentSlice,
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
