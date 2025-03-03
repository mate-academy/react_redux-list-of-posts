import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';
import { usersSlice } from '../components/features/users';
import { authorSlice } from '../components/features/author';
import { postsSlice } from '../components/features/posts';
import { selectedPostSlice } from '../components/features/selectedPost';
import { commentsSlice } from '../components/features/comments';

const rootReducer = combineSlices(
  usersSlice,
  authorSlice,
  postsSlice,
  selectedPostSlice,
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
