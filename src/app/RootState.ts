import { Action, ThunkAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { store } from './store';

export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
