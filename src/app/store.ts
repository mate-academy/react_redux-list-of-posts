import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';
import { usersSlice } from '../features/users';
import { postsSlice } from '../features/posts';
import { commentsSlice } from '../features/comments';
import { authorSlice } from '../features/author';
import { postSlice } from '../features/selectedPost';
// eslint-disable-next-line import/no-cycle
// import counterReducer from '../features/counter/counterSlice';

const rootReducer = combineSlices(
  usersSlice,
  postsSlice,
  commentsSlice,
  authorSlice,
  postSlice,
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
