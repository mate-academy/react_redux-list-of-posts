import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { apiSlice } from '../features/apiSlice';
import { userReducer, userSlice } from '../features/userSlice';
import { postsReducer, postSlice } from '../features/postSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [userSlice.name]: userReducer,
    [postSlice.name]: postsReducer,
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(apiSlice.middleware)
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
