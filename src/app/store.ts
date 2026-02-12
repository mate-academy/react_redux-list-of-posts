import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
import { usersSlice } from '../features/users';
import { authorSlice } from '../features/author';
import { postSlice } from '../features/posts';
import { selectedPostSlice } from '../features/selectedPost';
import { commentsSlice } from '../features/comments';
// eslint-disable-next-line import/no-cycle

const rootReducer = combineReducers({
  users: usersSlice.reducer,
  author: authorSlice.reducer,
  posts: postSlice.reducer,
  selectedPost: selectedPostSlice.reducer,
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
