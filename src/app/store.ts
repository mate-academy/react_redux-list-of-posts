import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/user';
import postReducer from '../features/posts';
import selectedPostReducer from '../features/selectedPost';

// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import allUsersReducer from '../features/allUsers';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    post: postReducer,
    selectedPost: selectedPostReducer,
    allUsers: allUsersReducer,
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
