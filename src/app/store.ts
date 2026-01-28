import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';
import { usersSlice } from '../features/users';
import { authorSlice } from '../features/author';
import { postsSlice } from '../features/posts';
import { selectedPostSlide } from '../features/selectedPost';
import { commentsSlice } from '../features/comments';

const rootReducer = combineSlices(
  usersSlice,
  authorSlice,
  postsSlice,
  selectedPostSlide,
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
