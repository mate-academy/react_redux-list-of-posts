import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersSlice from '../features/usersSlice';
import authorSlice from '../features/authorSlice';
import commentsSlice from '../features/commentsSlice';
import postsSlice from '../features/postsSlice';
import selectedPostSlice from '../features/selectedPostSlice';

export const store = configureStore({
  reducer: {
    usersSlice,
    authorSlice,
    commentsSlice,
    postsSlice,
    selectedPostSlice,
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
