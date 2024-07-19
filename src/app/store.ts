import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { usersReducer, usersSliceName } from '../features/users/userSlice';
import { postSliceName, postsReducer } from '../features/posts/postSlice';
import {
  commentsReducer,
  commentsSliceName,
} from '../features/comments/commentsSlice';

export const store = configureStore({
  reducer: {
    [usersSliceName]: usersReducer,
    [postSliceName]: postsReducer,
    [commentsSliceName]: commentsReducer,
  },
});

export type AppDispatch = (typeof store)['dispatch'];
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */

export interface ThunkConfig<T> {
  rejectValue: T;
  state: RootState;
}
