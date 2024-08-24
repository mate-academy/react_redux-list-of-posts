import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';

import usersReducer from '../features/users';
import authorReducer from '../features/author';
import postsReducer from '../features/posts';
import selectedPostReducer from '../features/selectedPost';
import commentsReducer from '../features/comments';

const rootReducer = combineReducers({
  users: usersReducer,
  author: authorReducer,
  posts: postsReducer,
  selectedPost: selectedPostReducer,
  comments: commentsReducer,
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
