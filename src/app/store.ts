import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersReducer from '../features/users/usersSlice';
import userReducer from '../features/author/authorSlice';
import userPostsReducer from '../features/userPosts/userPosts';
import selectedPostReducer from '../features/selectedPost/selectedPost';
import postCommentsReducer from '../features/comments/comments';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    author: userReducer,
    posts: userPostsReducer,
    selectedPost: selectedPostReducer,
    comments: postCommentsReducer,
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
