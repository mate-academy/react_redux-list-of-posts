import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postsReducer from '../features/posts';
import authorReducer from '../features/author';
import selectedPostReducer from '../features/selectedPost';
import usersReducer from '../features/users';
import commentsReducer from '../features/commets';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    author: authorReducer,
    selectedPost: selectedPostReducer,
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
