import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import { userSlice } from './usersSlice';
import { postSlice } from './postSlice';
import { commentSlice } from './commentSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userSlice.reducer,
    post: postSlice.reducer,
    comment: commentSlice.reducer,
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
