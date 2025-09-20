import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import { selectedPostSlice } from '../features/selectedPostSlice';
import { authorSlice } from '../features/authorSlice';
import { usersReducer, usersSlice } from '../features/usersSlice';
import { postsReducer, postsSlice } from '../features/postsSlice';
import { commentsReducer, commentsSlice } from '../features/commentsSlice';

export const rootReducer = combineSlices({
  counter: counterReducer,
  selectedPost: selectedPostSlice.reducer,
  author: authorSlice.reducer,
  [usersSlice.name]: usersReducer,
  [postsSlice.name]: postsReducer,
  [commentsSlice.name]: commentsReducer,
});

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
