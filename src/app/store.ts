/* eslint-disable import/no-cycle */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../components/Users/usersSlice';
import postsReducer from '../components/Posts/userPostsSlicer';
import commentsReducer from '../components/Comments/commentsSlicer';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    error: postsReducer,
    loading: postsReducer,
    comments: commentsReducer,
    selectedPost: postsReducer,
    counter: counterReducer,
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
