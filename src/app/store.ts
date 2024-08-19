import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../slices/usersSlice';
import authorReducer from '../slices/authorSlice';
import postsReducer from '../slices/postsSlice';
import selectedPostSlice from '../slices/selectedPostSlice';
import commentsSlice from '../slices/commentsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    author: authorReducer,
    posts: postsReducer,
    selectedPost: selectedPostSlice,
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
