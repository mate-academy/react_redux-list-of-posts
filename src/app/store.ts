import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { usersReducer } from '../features/slices/usersSlice';
import { commentsReducer } from '../features/slices/commentsSlice';
import { postsReducer } from '../features/slices/postsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    comments: commentsReducer,
    posts: postsReducer,
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
