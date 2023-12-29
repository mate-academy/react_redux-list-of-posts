import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
// eslint-disable-next-line import/no-cycle
import commentsReducer from '../features/comments/commentsSlice';
import usersReducer from '../features/users/usersSlice';
import authorReducer from '../features/users/authorSlice';
import postsReducer from '../features/posts/postsSlice';
import selectedPostReducer from '../features/posts/selectedPostSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
