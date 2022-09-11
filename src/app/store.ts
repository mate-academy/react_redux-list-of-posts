import {
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import postsReducer from '../features/postsSlice';
import usersReducer from '../features/usersSlice';
import commentsReducer from '../features/commentsSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
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
