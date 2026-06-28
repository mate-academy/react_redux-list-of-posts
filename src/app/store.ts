import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import usersReducer from '../features/users/usersSlice';
import authorReducer from '../features/author/authorSlice';
import postsReducer from '../features/posts/postsSlice';
import selectedPostReducer from '../features/selectedPost/selectedPostSlice';
import commentsReducer from '../features/comments/commentsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    author: authorReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

type ConfiguredThunk<T> = ThunkAction<T, RootState, unknown, Action<string>>;
export type AppThunk<ReturnType = void> = ConfiguredThunk<ReturnType>;
