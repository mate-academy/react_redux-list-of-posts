import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { usersReducer } from '../features/usersSlice';
import { counterSlice } from '../features/counter/counterSlice';
import { postsReducer } from '../features/postsSlice';
import { selectedPostReducer } from '../features/selectedPostSlice';
import { commentsReducer } from '../features/commentsSlice';
import { authorReducer } from '../features/authorSlice';

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  users: usersReducer,
  posts: postsReducer,
  selectedPost: selectedPostReducer,
  comments: commentsReducer,
  author: authorReducer,
});

export const store = configureStore({
  reducer: rootReducer,
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
