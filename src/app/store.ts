import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { usersSlice } from '../features/Task/users';
import { commentsSlice } from '../features/Task/comments';
import { postsSlice } from '../features/Task/posts';
import { selectedPostSlice } from '../features/Task/selectedPost';
import { authorSlice } from '../features/Task/author';

const rootReducer = combineSlices(
  usersSlice,
  commentsSlice,
  postsSlice,
  selectedPostSlice,
  authorSlice,
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
