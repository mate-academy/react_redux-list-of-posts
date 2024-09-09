import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import { counterSlice } from '../features/counter/counterSlice';
import { currentPostSlice } from '../features/posts/currentPostSlice';

const rootReducer = combineSlices(counterSlice, currentPostSlice);

export const store = configureStore({
  reducer: rootReducer,
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
