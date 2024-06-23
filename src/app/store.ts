import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { userReducer } from '../features/author';
import { postReducer } from '../features/post';
import { postsReducer } from '../features/posts';
import { usersReducer } from '../features/users';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    selectedUser: userReducer,
    selectedPost: postReducer,
    posts: postsReducer,
    users: usersReducer,
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
