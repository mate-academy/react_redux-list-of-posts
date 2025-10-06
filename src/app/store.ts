import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/userSlice';
import selectedUserReducer from '../features/selectedUserSlice';
import postsReducer from '../features/postsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    selectedUser: selectedUserReducer,
    posts: postsReducer,

    counter: counterReducer,
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
