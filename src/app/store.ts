import {
  configureStore, ThunkAction, Action, combineReducers,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/users/usersSlice';
import authorReducer from '../features/author/authorSlice';
import userPostsReducer from '../features/posts/userPostsSlice';
import selectedPostReducer from '../features/selectedPost/selectedPostSlice';

const reducer = combineReducers({
  counter: counterReducer,
  users: usersReducer,
  author: authorReducer,
  userPosts: userPostsReducer,
  selectedPost: selectedPostReducer,
});

export const store = configureStore({
  reducer,
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
