import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import commentsReducer from './features/comments/commentsSlice';
import usersReducer from './features/users/usersSlice';
import postsReducer from './features/posts/postsSlice';
import authorReducer from './features/author/authorSlice';
import selectedPostReducer from './features/selected/selectedPostSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    comments: commentsReducer,
    users: usersReducer,
    posts: postsReducer,
    author: authorReducer,
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
