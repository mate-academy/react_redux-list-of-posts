import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';
import { postsSlice } from '../features/Posts/PostsSlice';
import { commentsSlice } from '../features/Comments/CommentsSlice';
import { usersSlice } from '../features/Users/UsersSlice';
import { authorSlice } from '../features/Author/AuthorSlice';
import { selectedPostSlice } from '../features/SelectedPost/SelectedPostSlice';
// eslint-disable-next-line import/no-cycle

const rootReducer = combineSlices(
  postsSlice,
  commentsSlice,
  usersSlice,
  authorSlice,
  selectedPostSlice,
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
