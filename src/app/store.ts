import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/users';
import authorReducer from '../features/author';
import selectedPostReducer from '../features/selectedPost';
import postsReducer from '../features/posts';
import commentsReducer from '../features/comments';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    author: authorReducer,
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
