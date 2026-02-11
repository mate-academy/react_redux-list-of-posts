import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';
import { usersSlice } from '../features/users';
import { counterSlice } from '../features/counter/counterSlice';
import { selectedPostSlice } from '../features/selectedPost';
import { postsSlice } from '../features/posts';
import { authorSlice } from '../features/author';
import { commentsSlice } from '../features/comments';
import { newCommentFormSlice } from '../features/newCommentForm';

const rootReducer = combineSlices(
  usersSlice,
  counterSlice,
  selectedPostSlice,
  postsSlice,
  authorSlice,
  commentsSlice,
  newCommentFormSlice,
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
