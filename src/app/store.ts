import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';
import { postsSlice } from '../features/posts/postsSlice';
import { usersSlice } from '../features/users/usersSlice';
import { authorSlice } from '../features/author/authorSlice';
import { commentsSlice } from '../features/comments/commentsSlice';
import { selectedPostSlice } from '../features/selectedPost/selectedPostSlice';

const rootReducer = combineSlices(
  authorSlice,
  commentsSlice,
  postsSlice,
  selectedPostSlice,
  usersSlice,
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
