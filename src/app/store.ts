import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from '../features/usersSlice';
import postsReducer from '../features/postsSlice';
import commentsReducer from '../features/commentsSlice';
import formReducer from '../features/formSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
    form: formReducer,
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
