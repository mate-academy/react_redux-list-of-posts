import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../slices/UsersSlices';
import authorReducer from '../slices/AuthorSlice';
import postsReducer from '../slices/PostsSlice';
import selectedPostReducer from '../slices/SelectedPostSlice';
import commentsReducer from '../slices/CommentsSlice';

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

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
