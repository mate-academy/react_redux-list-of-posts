import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postsPageReducer from '../features/posts/postsSlice';

export const store = configureStore({
  reducer: {
    postsPage: postsPageReducer,
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
