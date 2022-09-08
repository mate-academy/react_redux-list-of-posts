import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { currentPostStateReducer } from '../features/currentPostSlice';
import { postsStateReducer } from '../features/postsSlice';
import { usersStateReducer } from '../features/usersSlice';

export const store = configureStore({
  reducer: {
    usersState: usersStateReducer,
    postsState: postsStateReducer,
    currentPostState: currentPostStateReducer,
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
