import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import userReducer from '../features/usersSlice';
import authorReducer from '../features/autorSlice';
import postReducer from '../features/postSlice';
import selectedPostReducer from '../features/selectedPostSlice';
import commentReducer from '../features/commentSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    author: authorReducer,
    posts: postReducer,
    selectedPost: selectedPostReducer,
    comments: commentReducer,
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
