import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import authorSlice from '../features/authorSlice';
import commentsSlice from '../features/commentsSlice';
import postSlice from '../features/postSlice';
import selectedPostSlice from '../features/selectedPostSlice';
import usersSlice from '../features/usersSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    authorSlice,
    commentsSlice,
    postSlice,
    selectedPostSlice,
    usersSlice,
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
