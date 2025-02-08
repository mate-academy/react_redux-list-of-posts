import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { usersSlice } from '../features/usersSlice';
import { currentUserSlice } from '../features/currentUserSlice';
import { postsSlice } from '../features/postsSlice';
import { currentPostSlice } from '../features/currentPostSlice';
import { commentsSlice } from '../features/commentsSlice';

const rootReducer = combineSlices(
  usersSlice,
  currentUserSlice,
  postsSlice,
  currentPostSlice,
  commentsSlice,
);

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
