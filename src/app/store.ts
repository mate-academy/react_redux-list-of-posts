import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { usersSlice } from '../features/slices/usersSlice';
import { authorSlice } from '../features/slices/authorSlice';
import { postsSlice } from '../features/slices/postsSlice';
import { selectedPost } from '../features/slices/selectedPost';
import { commentsSlice } from '../features/slices/commentsSlice';

const rootReducer = combineReducers({
  users: usersSlice.reducer,
  author: authorSlice.reducer,
  posts: postsSlice.reducer,
  selectedPost: selectedPost.reducer,
  comments: commentsSlice.reducer,
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
