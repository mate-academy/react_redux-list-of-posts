import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import { postSlice } from '../features/postSlice/postSlice';
import { userSlice } from '../features/userSlice';
import { authorSlice } from '../features/autorSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postSlice.reducer,
    users: userSlice.reducer,
    authors: authorSlice.reducer,
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
