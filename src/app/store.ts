import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authorReducer from '../features/authorReducer';
import commentsReducer from '../features/commentsReducer';
import postsReducer from '../features/postsSlice';
import selectedPostReducer from '../features/selectedPostReducer';
import usersReducer from '../features/usersSlicer';

export const store = configureStore({
  reducer: {
    author: authorReducer,
    users: usersReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
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
