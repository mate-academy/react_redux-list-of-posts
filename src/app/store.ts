import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReduser from '../features/users';
import postReduser from '../features/posts';
import comentReduser from '../features/coments';
// eslint-disable-next-line import/no-cycle

export const store = configureStore({
  reducer: {
    users: userReduser,
    posts: postReduser,
    comments: comentReduser,
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
