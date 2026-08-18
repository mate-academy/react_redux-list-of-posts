import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../redux/usersSlice';
import authorReducer from '../redux/authorSlice';
import postsReducer from '../redux/postsSlice';
import selectedPostReducer from '../redux/selectedPostSlice';
import commentsReducer from '../redux/commentsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    author: authorReducer,
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
