import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import postsReducer from './slices/postsSlice';
import authorReducer from './slices/authorSlice';
import usersReducer from './slices/usersSlice';
import selectedPostReducer from './slices/selectedPostSlice';
import commentsReducer from './slices/commentsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    author: authorReducer,
    users: usersReducer,
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
