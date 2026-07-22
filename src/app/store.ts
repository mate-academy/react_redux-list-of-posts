import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import { authorSlice } from '../features/authorSlice';
import { userSlice } from '../features/userSlice';
import { postsSlice } from '../features/postsSlice';
import { selectedPostSlice } from '../features/selectedPostSlice';

const reducer = combineReducers({
  counter: counterReducer,
  author: authorSlice.reducer,
  users: userSlice.reducer,
  posts: postsSlice.reducer,
  selectedPost: selectedPostSlice.reducer,
});

export const store = configureStore({
  reducer,
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
