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
import { postsReducer } from '../features/postsSlice';
import { commentsReducer } from '../features/commentsSlice';

export const rootReducer = combineSlices({
  counter: counterReducer,
  [selectedPostSlice.name]: selectedPostSlice.reducer,
  [authorSlice.name]: authorSlice.reducer,
  [usersSlice.name]: usersReducer,
  posts: postsReducer,
  comments: commentsReducer,
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
