import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { usersReducer } from './slices/usersSlice';
import { postsReducer } from './slices/postsSlice';
import { commentsReducer } from './slices/commentsSlice';
// eslint-disable-next-line import/no-cycle

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    posts: postsReducer,
    users: usersReducer,
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
