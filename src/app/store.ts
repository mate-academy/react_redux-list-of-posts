import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { combineReducers } from 'redux';
import { clientAPI } from './clientApi';

const rootReduser = combineReducers({
  [clientAPI.reducerPath]: clientAPI.reducer,
});

export const storCreat = () => {
  return configureStore({
    reducer: rootReduser,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(clientAPI.middleware);
    },
  });
};

export const store = storCreat();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// /* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
// /* eslint-enable @typescript-eslint/indent */
