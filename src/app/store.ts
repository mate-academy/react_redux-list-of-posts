import { configureStore, combineSlices } from '@reduxjs/toolkit';
import { usersSlice } from '../features/users/usersSlice';
import { postsSlice } from '../features/posts/postsSlice';
import { commentsSlice } from '../features/comments/commentsSlice';
import { selectedPostSlice } from '../features/selectedPost/selectedPostSlice';
import { authorSlice } from '../features/author/authorSlice';

const rootReducer = combineSlices(
  usersSlice,
  postsSlice,
  commentsSlice,
  selectedPostSlice,
  authorSlice,
);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
