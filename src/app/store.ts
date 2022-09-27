/* eslint-disable */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import commentsReducer from '../features/commentSlice/commentSlice';
import postsReducer from '../features/postsSlice/postsSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
