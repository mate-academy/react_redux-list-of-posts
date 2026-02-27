import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';

import { authorSlice } from '../features/authorSlice';
import { selectedPostSlice } from '../features/selectedPostSlice';
import { postsSlice } from '../features/postsSlice';
import { usersSlice } from '../features/usersSlice';
import { commentsSlice } from '../features/commentsSlice';
// eslint-disable-next-line import/no-cycle

const rootReducer = combineSlices(
  authorSlice,
  selectedPostSlice,
  postsSlice,
  usersSlice,
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
