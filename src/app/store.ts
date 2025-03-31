import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import postReducer from '../features/post';
import userReducer from '../features/user';
import authorReducer from '../features/author';
import selectedPostReducer from '../features/selectedPost';
import comentstReducer from '../features/coments';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postReducer,
    user: userReducer,
    author: authorReducer,
    selectedPost: selectedPostReducer,
    coments: comentstReducer,
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
