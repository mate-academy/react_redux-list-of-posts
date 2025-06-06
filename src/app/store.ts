import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import postsReducer from '../features/posts';
import commentsReducer from '../features/comments';
import authorReducer from '../features/author';
import selectedPostReducer from '../features/selectedPost';
import usersReducer from '../features/users';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    comments: commentsReducer,
    author: authorReducer,
    selectedPost: selectedPostReducer,
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
