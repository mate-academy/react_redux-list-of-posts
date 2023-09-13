import {
  configureStore,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-extraneous-dependencies
import logger from 'redux-logger';

// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/users/usersSlice';
import postsSlice from '../features/posts/postsSlice';
import currentUserSlice from '../features/currentUser/currentUserSlice';
import currentPostSlice from '../features/currentPost/currentPost';
import postsDetailsSlice from '../features/postsDetails/postsDetailsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userReducer,
    posts: postsSlice,
    currentUser: currentUserSlice,
    currentPost: currentPostSlice,
    comments: postsDetailsSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
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
