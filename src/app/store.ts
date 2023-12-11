import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import authorReducer from '../features/posts/authorSlice';
import usersReducer from '../features/posts/usersSlice';
import postsReducer from '../features/posts/postsSlice';
import selectedPostReducer from '../features/posts/selectedPostSlice';
import commentsReducer from '../features/posts/commentsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
