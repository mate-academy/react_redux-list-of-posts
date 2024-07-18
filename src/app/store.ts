import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { authorSlice } from '../features/authorSlice';
import { commentSlice } from '../features/commentSlice';
import { postSlice } from '../features/postSlice';
import { userSlice } from '../features/userSlice';
// eslint-disable-next-line import/no-cycle

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    author: authorSlice.reducer,
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
