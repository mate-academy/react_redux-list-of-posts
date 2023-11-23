import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { postReducer } from '../features/postListSlice';
import { userReducer } from '../features/usersSlice';
import { authorReducer } from '../features/authorSlise';

// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import { commentsReducer } from '../features/commentsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postReducer,
    users: userReducer,
    author: authorReducer,
    comments: commentsReducer,
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
