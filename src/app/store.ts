import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersSlice from '../features/users/usersSlice';
import postsSlice from '../features/posts/postsSlice';
import commentsSlice from '../features/comments/commentsSlice';

const rootReduser = combineSlices(usersSlice, postsSlice, commentsSlice);

export const store = configureStore({
  reducer: rootReduser,
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
