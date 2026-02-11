import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { counterSlice } from '../features/counter/counterSlice';
import { authorSlice } from '../features/users/authorSlice';
import { usersSlice } from '../features/users/usersSlice';
import { postsSlice } from '../features/post/postSlice';
import { selectedPostSlice } from '../features/post/selectedPost';
import { commentsSlice } from '../features/comments/comment';

const RootReducer = combineSlices(
  counterSlice,
  authorSlice,
  usersSlice,
  postsSlice,
  selectedPostSlice,
  commentsSlice,
);

export const store = configureStore({
  reducer: RootReducer,
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
