import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { userReducer } from '../features/users';
import { currentUserReducer } from '../features/currentUser';
import { userPostsReducer } from '../features/userPosts';
import { selectedPostReducer } from '../features/selectedPost';
import { postCommentsReducer } from '../features/postComments';

export const store = configureStore({
  reducer: {
    users: userReducer,
    author: currentUserReducer,
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
