import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import usersStateSlice from '../features/usersStateSlice';

export const store = configureStore({
  reducer: {
    usersState: usersStateSlice,
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
