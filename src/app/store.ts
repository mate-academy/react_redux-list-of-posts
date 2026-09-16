import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';
import { postsSlice } from '../store/postsSlice';
import { usersSlice } from '../store/usersSlice';
import { authorSlice } from '../store/authorSlice';
import { selectedPostSlice } from '../store/selectedPostSlice';
import { commentsSlice } from '../store/commentsSlice';

const rootReducer = combineSlices(
  postsSlice,
  usersSlice,
  authorSlice,
  selectedPostSlice,
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
