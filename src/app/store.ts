import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { usersReducer } from '../features/counter/usersSlice';
import { postsReducer } from '../features/counter/postSlice';
import { commentsReducer } from '../features/commentSlice';
import { selectedPostReducer } from '../features/counter/selectedPost';

export const store = configureStore({
  reducer: {
    usersReducer,
    postsReducer,
    selectedPostReducer,
    commentsReducer,
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
