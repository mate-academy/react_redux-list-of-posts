import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import api from '../api/api';
import usersReducer from '../features/users/usersSlice';
import postsReducer from '../features/posts/postsSlice';
import commentsReducer from '../features/comments/commentsSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
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
