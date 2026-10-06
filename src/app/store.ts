import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { authorSlice } from '../features/author';
import { postsSlice } from '../features/posts';
import { selectedPostSlice } from '../features/selectedPost';
import { usersSlice } from '../features/users';
import { commentsSlice } from '../features/comments';

const rootReducer = combineReducers({
  posts: postsSlice.reducer,
  selectedPost: selectedPostSlice.reducer,
  author: authorSlice.reducer,
  users: usersSlice.reducer,
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
