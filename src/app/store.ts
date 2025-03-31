import {
  configureStore,
  ThunkAction,
  Action,
  combineSlices,
} from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { UsersSlice } from '../features/UsersSlice';
import { authorSlice } from '../features/AuthorSlice';
import { PostsSlice } from '../features/PostsSlice';
import { SelectedPostSlice } from '../features/SelectedPost';
import { CommentSlice } from '../features/CommentsSlice';

const rootReducer = combineSlices(
  UsersSlice,
  authorSlice,
  PostsSlice,
  SelectedPostSlice,
  CommentSlice,
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
