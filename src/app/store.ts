import {
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import postsReducer from '../features/postsSlice';
import usersSlice from '../features/usersSlice';
import commentsSlice from '../features/commentsSlice';

export const store = configureStore({
  reducer: {
    users: usersSlice,
    posts: postsReducer,
    comments: commentsSlice,
  },
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
