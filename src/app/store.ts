import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../features/counter/users/usersSlice';
import authorReducer from '../features/counter/author/authorSlice';
// eslint-disable-next-line max-len
import selectedsPostReducer from '../features/counter/selectedPost/selectedPost';
import postReducer from '../features/counter/postsSlice/postsSlice';
import commentsReducer from '../features/counter/comments/commentsSlice';
// eslint-disable-next-line import/no-cycle
//import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    author: authorReducer,
    selectedPost: selectedsPostReducer,
    posts: postReducer,
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
