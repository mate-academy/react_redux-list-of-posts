import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import { counterSlice } from '../features/counter/counterSlice';
import { selectedPostSlice } from '../features/posts/selectedPostSlice';
import { usersSlice } from '../features/posts/usersSlice';
import { authorSlice } from '../features/posts/authorSlice';
import { postsSlice } from '../features/posts/postsSlice';
import { commentsSlice } from '../features/posts/commentsSlice';

const rootReducer = combineSlices(
  counterSlice,
  selectedPostSlice,
  usersSlice,
  authorSlice,
  postsSlice,
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
