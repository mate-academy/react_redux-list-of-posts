import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { usersSlice } from '../features/slice/usersSlice';
import { postsSlice } from '../features/slice/postsSlice';
import { authorSlice } from '../features/slice/authorSlice';
import { selectedPostSlice } from '../features/slice/selectedPostSlice';
import { commentsSlice } from '../features/slice/commentsSlice';

const rootReducer = combineSlices(
  usersSlice,
  authorSlice,
  postsSlice,
  selectedPostSlice,
  commentsSlice,
);

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
