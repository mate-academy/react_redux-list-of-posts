/* eslint-disable import/no-cycle */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { emptyApi } from '../features/emptyApi';
import { postsSlice } from '../features/posts/postsSlice';
import { currUserSlice } from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    currentUser: currUserSlice.reducer,
    currentPost: postsSlice.reducer,
    [emptyApi.reducerPath]: emptyApi.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(emptyApi.middleware);
  },
});

setupListeners(store.dispatch);

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
