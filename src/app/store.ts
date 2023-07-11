import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { userSlice } from '../features/users/users';
import { authorSlice } from '../features/author/author';

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    author: authorSlice.reducer,
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
