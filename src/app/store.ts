import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersReducer from '../features/users/usersSlice';
import postsReducer from '../features/posts/postSlice';
import postReducer from '../features/selectedPost/selectedPostSlice';
import userReducer from '../features/user/userSlice';
import commentsReducer from '../features/comments/commentsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    selectedPost: postReducer,
    users: usersReducer,
    user: userReducer,
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
