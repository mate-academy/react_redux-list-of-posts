import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersReducer from '../features/users/users';
import currentUserReducer from '../features/currentUser/currentUser';
import userPostsReducer from '../features/userPosts/userPosts';
import selectedPostReducer from '../features/selectedPost/selectedPost';
import commentsReducer from '../features/comments/commnets';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    currentUser: currentUserReducer,
    userPosts: userPostsReducer,
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
