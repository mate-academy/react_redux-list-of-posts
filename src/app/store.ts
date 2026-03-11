import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postsReducer from '../features/postsSlice';
import authorReducer from '../features/authorSlice';
import selectedPostReducer from '../features/selectedPostSlice';
import commentsReducer from '../features/commentsSlice';
import usersReducer from '../features/usersSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    author: authorReducer,
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
