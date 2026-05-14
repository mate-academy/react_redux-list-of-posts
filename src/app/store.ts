import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../features/users/userSlice';
import authorReducer from '../features/author/authorSlice';
import postReducer from '../features/post/postSlice';
import selectedReducer from '../features/selectedPost/selectedPostSlice';
import commentReducer from '../features/commentSlice/commentSlice';
// eslint-disable-next-line import/no-cycle

export const store = configureStore({
  reducer: {
    users: usersReducer,
    author: authorReducer,
    post: postReducer,
    selectedPost: selectedReducer,
    comment: commentReducer,
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
