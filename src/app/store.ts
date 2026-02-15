import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { selectedUserReducer, usersReducer } from '../features/users';
import { postsReducer, selectedPostReducer } from '../features/posts';
import { commentsReducer } from '../features/comments';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    selectedUser: selectedUserReducer,
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
