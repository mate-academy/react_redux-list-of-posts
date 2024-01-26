import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import postsReducer from '../features/PostsSlice';
import authorReducer from '../features/AuthorSlice';
import usersReducer from '../features/UsersSlice';
import commentsReducer from '../features/CommentsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    author: authorReducer,
    users: usersReducer,
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
