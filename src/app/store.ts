import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersSlice from '../features/counter/users/userSlice';
import postsSlice from '../features/counter/posts/postSlice';
import commentsSlice from '../features//counter/comments/commentsSlice';

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
