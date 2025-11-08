import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import authorReducer from '../features/author';
import usersReducer from '../features/users';
import selectedPostReducer from '../features/selectedPost';
import postsReducer from '../features/posts';
import commentsReducer from '../features/comments';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
