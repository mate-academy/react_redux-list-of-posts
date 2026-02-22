import {
  combineSlices,
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { counterSlice } from '../features/counter/counterSlice';
import { usersSlice } from '../features/usersSlice';
import { authorSlice } from '../features/authorSlice';
import { postsSlice } from '../features/postsSlice';
import { selectedPostSlice } from '../features/selectedPostSlice';
import { commentsSlice } from '../features/commentsSlice';

const rootReducer = combineSlices(
  usersSlice,
  counterSlice,
  authorSlice,
  postsSlice,
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
