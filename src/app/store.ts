import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { commentsReducer } from '../features/comments/commentsSlice';
// eslint-disable-next-line import/no-cycle
import { postsReducer } from '../features/posts/postsSlice';
import { usersReducer } from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
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
