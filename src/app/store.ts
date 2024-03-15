import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../features/usersSlice';
import postsReducer from '../features/postsSlice';
import commentsReducer from '../features/commentsSlice';
import selectedPostReducer from '../features/selectedPostSlice';
// eslint-disable-next-line import/no-cycle

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
    selectedPost: selectedPostReducer,
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
