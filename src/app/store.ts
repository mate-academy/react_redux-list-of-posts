import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { usersApiSlice } from '../features/users/user-api-slice';
import userSelectReducer from '../features/users/user-slice';

export const store = configureStore({
  reducer: {
    select: userSelectReducer,
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware().concat(usersApiSlice.middleware);
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
