import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authorSlice from '../features/authorSlice';
import commentsSlice from '../features/commentsSlice';
import postsSlice from '../features/postsSlice';
import selectedPostSlice from '../features/selectedPostSlice';
import usersSlice from '../features/usersSlice';
// eslint-disable-next-line import/no-cycle

export const store = configureStore({
  reducer: {
    users: usersSlice,
    posts: postsSlice,
    user: authorSlice,
    post: selectedPostSlice,
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
