import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import { authorSlice } from './reducers/authorSlice';
import { postsSlice } from './reducers/postsSlice';
import { selectedPostSlice } from './reducers/selectedPostSlice';
import { usersSlice } from './reducers/usersSlice';

const rootReducer = combineSlices({
  author: authorSlice.reducer,
  posts: postsSlice.reducer,
  selectedPost: selectedPostSlice.reducer,
  users: usersSlice.reducer,
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
