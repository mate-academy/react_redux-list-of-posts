import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/users';
import authorReducer from '../features/author';
import postsReducer from '../features/posts';
import selectedPostReducer from '../features/selectedPost';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userReducer,
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
