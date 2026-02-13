import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import { usersSlice } from '../features/usersApi/usersApi';
import { postsSlice } from '../features/postsApi/postsApi';
import { selectedPostSlice } from '../features/selectedPost/selectedPost';
import { commentsSlice } from '../features/postComments/postComments';

const rootReducer = combineReducers({
  counter: counterReducer,
  users: usersSlice.reducer,
  posts: postsSlice.reducer,
  selectedPost: selectedPostSlice.reducer,
  comments: commentsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
