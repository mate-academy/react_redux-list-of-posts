import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersReducer from '../features/usersSlice';
import postsReducer from '../features/postsSlice';
import commentsReducer from '../features/commentsSlice';
import selectedPostReducer from '../features/selectedPost';
import authorReducer from '../features/authorSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
    author: authorReducer,
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
