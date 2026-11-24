import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';
import { authorSlice } from '../features/authorSlice';
import { selectedPostSlice } from '../features/selectedPostSlice';
import { usersSlice } from '../features/usersSlice';
import { postsSlice } from '../features/postsSlice';
import { commentSlice } from '../features/commentsSlice';

const rootReducer = combineSlices(
  authorSlice,
  selectedPostSlice,
  usersSlice,
  postsSlice,
  commentSlice,
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
