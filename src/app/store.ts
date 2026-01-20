import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import postsReducer from '../features/usersSlice';
import authorReducer from '../features/authorSlice';
import userReducer from '../features/postsSlice';
import postCommentsReducer from '../features/commentSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: postsReducer,
    author: authorReducer,
    posts: userReducer,
    postComments: postCommentsReducer,
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
