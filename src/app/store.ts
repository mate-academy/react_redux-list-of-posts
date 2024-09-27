import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';
import { usersSlice } from '../features/usersSlice';
import { counterSlice } from '../features/counter/counterSlice';
import { selectedPostSlice } from '../features/selectedPostSlice';
import { postsSlice } from '../features/postsSlice';
import { authorSlice } from '../features/authorSlice';
import { commentsSlice } from '../features/commentsSlice';
import { newCommentFormSlice } from '../features/newCommentFormSlice';

const rootReducer = combineSlices(
  usersSlice,
  counterSlice,
  selectedPostSlice,
  postsSlice,
  authorSlice,
  commentsSlice,
  newCommentFormSlice,
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
