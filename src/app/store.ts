import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { postsReducer } from '../features/Slices/postSlise';
import { usersReducer } from '../features/Slices/usersSlice';
import { selectedPostReducer } from '../features/Slices/selectedPostSlice';
import { authorReducer } from '../features/Slices/author';
import { commentsReducer } from '../features/Slices/comments';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    author: authorReducer,
    selectedPost: selectedPostReducer,
    comments: commentsReducer,
  },
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
