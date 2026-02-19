import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersReducer from './userSlice';
import authorReducer from './authorSlice';
import postsReducer from './postsSlice';
import selectedPostReducer from './selectedPostSlice';
import commentsReducer from './commentsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    author: authorReducer,
    posts: postsReducer,
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
