import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/userSlice';
import postReducer from '../features/postSlice';
import commentsReducer from '../features/commentsSlice';
import selectedPostReducer from '../features/selectedPostSlice';
import authorReducer from '../features/authorSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userReducer,
    posts: postReducer,
    comments: commentsReducer,
    selectedPost: selectedPostReducer,
    author: authorReducer,
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
