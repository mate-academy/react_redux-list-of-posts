import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authorReducer from '../features/author/authorSlice';
import selectedPostReducer from '../features/selectedPost/selectedPostSlice';

// eslint-disable-next-line import/no-cycle
import { api } from '../api/apiRTKQuery';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    author: authorReducer,
    selectedPost: selectedPostReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
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
