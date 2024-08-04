import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import usersSlice from '../features/users';
import postsSlice from '../features/posts';
import authorSlice from '../features/author';
import selectedPostSlice from '../features/selectedPost';
import commentsSlice from '../features/comments';

const rootReducer = combineReducers({
  users: usersSlice,
  author: authorSlice,
  posts: postsSlice,
  selectedPost: selectedPostSlice,
  comments: commentsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, Action<string>>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
