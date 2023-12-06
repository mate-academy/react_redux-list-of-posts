import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/usersSlice';
import authorReducer from '../features/authorSlice';
import userPostsReducer from '../features/userPostsSlice';
import selectedPostReducer from '../features/selectedPostSlice';
import postCommentsReducer from '../features/postCommentsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    author: authorReducer,
    userPosts: userPostsReducer,
    selectedPost: selectedPostReducer,
    postComments: postCommentsReducer,
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
