import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import commentsSlice from '../features/commentsSlice';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import postsSlice from '../features/postsSlice';
import selectedPostSlice from '../features/selectedPostSlice';
import selectedUserSlice from '../features/selectedUserSlice';
import usersSlice from '../features/usersSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsSlice,
    post: selectedPostSlice,
    user: selectedUserSlice,
    users: usersSlice,
    comments: commentsSlice,
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
