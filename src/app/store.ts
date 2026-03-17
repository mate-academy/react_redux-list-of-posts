import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import postsReducer from '../features/posts/postsSlice';
import selectedPostReducer from '../features/posts/selectedPostSlice'
import commentsReducer from '../features/comments/commentsSlice';
import authorReducer from '../features/author/authorSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
    author: authorReducer,
    selectedPostId: selectedPostReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
