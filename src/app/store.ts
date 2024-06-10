import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersReducer from '../features/users/usersSlice';
import postReducer from '../features/post/postSlice';
import commentReducer from '../features/comments/commentSlice';
import authorReducer from '../features/author/authorSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    author: authorReducer,
    posts: postReducer,
    comment: commentReducer,
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
