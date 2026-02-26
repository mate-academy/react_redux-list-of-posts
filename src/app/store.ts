import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { usersSlice } from '../features/usersSlice';
import { postsSlice } from '../features/postsSlice';
import { authorSlice } from '../features/authorSlice';
import { selectedPostSlice } from '../features/selectedPostSlice';
import { commentsSlice } from '../features/commentsSlice';

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
/* eslint-enable @typescript-eslint/indent */
