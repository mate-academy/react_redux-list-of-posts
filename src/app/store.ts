import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authorReducer from '../features/authorSlice';
import postsReducer from '../features/postsSlice';
import selectedPostReducer from '../features/selectedPostSlice';
import commentsReducer from '../features/commentsSlice';
import usersReducer from '../features/usersSlice';

export const store = configureStore({
  reducer: {
    author: authorReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
    comments: commentsReducer,
    users: usersReducer,
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
