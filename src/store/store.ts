import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { clientAPI } from './clientApi';
import authorReducer from './Reducers/AuthorSlice';
import selectedPostReducer from './Reducers/SelectedPostSlice';

export const storCreat = () => {
  return configureStore({
    reducer: {
      [clientAPI.reducerPath]: clientAPI.reducer,
      author: authorReducer,
      selectedPost: selectedPostReducer,
    },
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
