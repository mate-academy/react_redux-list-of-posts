import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import postsSlice from '../features/counter/Slice/postsSlice';
import authorSlice from '../features/counter/Slice/authorSlice';
import counterSlice from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    author: authorSlice,
    posts: postsSlice,
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
