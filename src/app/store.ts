import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersReducer from '../features/counter/users';
import postsReducer from '../features/counter/posts';
import commentsReducer from '../features/counter/comments';
import authorReducer from '../features/counter/author';
import selectedPostReducer from '../features/counter/selectedPost';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
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
