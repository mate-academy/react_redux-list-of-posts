import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { userApi } from '../features/userApi';
import { userReducer, userSlice } from '../features/userSlice';
import { postsReducer, postSlice } from '../features/postSlice';
import { postApi } from '../features/postApi';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [userSlice.name]: userReducer,
    [postSlice.name]: postsReducer,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(userApi.middleware, postApi.middleware)
  ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const selectors = {
  getSelectedUserId: (state: RootState) => state.user.selectedUserId || 0,
  getSelectedPostId: (state: RootState) => state.post.selectedPostId || 0,
};

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
