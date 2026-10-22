import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';
import { usersSlice } from '../features/users';
import { postsSlice } from '../features/posts';
import { selectedPostSlice } from '../features/selectedPost';
import { authorSlice } from '../features/author';
import { commentsSlice } from '../features/comments';

const rootReducer = combineSlices(
  usersSlice,
  postsSlice,
  selectedPostSlice,
  authorSlice,
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
