import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authorReducer from '../features/authorSlice';
import usersReducer from '../features/usersSlice';
import selectedPostReducer from '../features/selectedPostSlice';
import postsReducer from '../features/postsSlice';
import commentsReducer from '../features/commentsSlice';

export const store = configureStore({
  reducer: {
    author: authorReducer,
    users: usersReducer,
    selectedPost: selectedPostReducer,
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
