import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import userReducer from '../features/users-slice';
import authorReducer from '../features/author-slice';
import postReducer from '../features/posts-slice';
import selectedPostReducer from '../features/selectedPost-slice';
import commentReducer from '../features/comments-slice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    author: authorReducer,
    posts: postReducer,
    selectedPost: selectedPostReducer,
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
