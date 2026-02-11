import { configureStore, combineSlices } from '@reduxjs/toolkit';
import { authorSlice } from '../features/author';
import { usersSlice } from '../features/users';
import { postsSlice } from '../features/posts';
import { selectedPostSlice } from '../features/selectedPost';
import { commentsSlice } from '../features/comments';

const rootReducer = combineSlices(
  authorSlice,
  usersSlice,
  postsSlice,
  selectedPostSlice,
  commentsSlice,
);

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
