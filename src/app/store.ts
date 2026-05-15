import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { counterSlice } from '../features/counter/counterSlice';
import { usersSlice } from '../features/users/users';
import { authorSlice } from '../features/author/author';
import { postsSlice } from '../features/posts/posts';
import { postSLice } from '../features/posts/selectedPost';
import { commentsSlice } from '../features/comments/comments';

const rootReducer = combineSlices(
  counterSlice,
  usersSlice,
  authorSlice,
  postsSlice,
  postSLice,
  commentsSlice,
);

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
