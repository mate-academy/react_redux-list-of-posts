import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import infoAppReducer from '../features/counter/infoAppSlice';
import usersSliceReducer from '../features/counter/usersSlice';
import someUserSlice from '../features/counter/someUserSlicer';
import commentsSliceReducer from '../features/counter/commentsSlice';

export const store = configureStore({
  reducer: {
    counter: infoAppReducer,
    users: usersSliceReducer,
    someUser: someUserSlice,
    comments: commentsSliceReducer,
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
