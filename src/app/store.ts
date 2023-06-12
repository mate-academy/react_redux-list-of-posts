/* eslint-disable import/no-cycle */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import postsReducer from '../features/posts/postsSlice';
import selectedPostReducer from '../features/postDetail/postDetailSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
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
