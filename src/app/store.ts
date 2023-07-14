import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { usersSlice } from './slices/usersSlice';
import { authorSlice } from './slices/authorSlice';
import { postsSlice } from './slices/postsSlice';
import { selectedPostSlice } from './slices/selectedPostSlice';
import { commentSlice } from './slices/commentSlice';

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    author: authorSlice.reducer,
    posts: postsSlice.reducer,
    selectedPost: selectedPostSlice.reducer,
    comments: commentSlice.reducer,
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
