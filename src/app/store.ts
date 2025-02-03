import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
// import counterReducer from '../features/counter/counterSlice';

import { usersSlice } from '../features/users';
import { userSlice } from '../features/user';
import { postsSlice } from '../features/posts';
import { selectedPostSlice } from '../features/selectedPost';
import { commentsSlice } from '../features/comments';
import { NewCommentFormSlice } from '../features/newComentsForm';

const rootReducr = combineReducers({
  users: usersSlice.reducer,
  user: userSlice.reducer,
  posts: postsSlice.reducer,
  post: selectedPostSlice.reducer,
  comments: commentsSlice.reducer,
  newCommentForm: NewCommentFormSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducr,
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
