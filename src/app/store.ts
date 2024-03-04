import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle

import postReducer, { PostState } from '../features/postSlice';
import userReducer, { UserState } from '../features/userSlice';
import  commentsReducer, { CommentState } from '../features/commentSlice';

interface Store {
  comments: CommentState,
  posts: PostState,
  users: UserState,
}

export const store = configureStore<Store>({
  reducer: {
    posts: postReducer,
    users: userReducer,
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
