import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import usersReducer from './reducers/usersSlice';
import postsReducer from './reducers/postsSlice';
import commentsReducer from './reducers/commentsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
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
