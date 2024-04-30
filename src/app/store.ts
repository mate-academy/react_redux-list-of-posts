import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from '../services/userApi';
import { postsApi } from '../services/postApi';
import { commentsApi } from '../services/commentApi';
import { setupListeners } from '@reduxjs/toolkit/query';
// eslint-disable-next-line import/no-cycle

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(postsApi.middleware)
      .concat(commentsApi.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
