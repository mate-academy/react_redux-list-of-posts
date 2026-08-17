import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
// import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../redux/usersSlice';
import authorReducer from '../redux/authorSlice';
import postsReducer from '../redux/postSlice';
import selectedPostReducer from '../redux/selectedPostSlice';
import commentsReducer from '../redux/commentsSlice';

export const store = configureStore({
  reducer: {
    comments: commentsReducer,
    users: usersReducer,
    author: authorReducer,
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
