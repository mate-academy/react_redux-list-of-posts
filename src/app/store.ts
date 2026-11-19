import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import postsReducer from '../features/Posts.reducers.actions';
import usersReducer from '../features/Users.reducers.actions';
import authorReducer from '../features/Author.reducers.actions';
import postReducer from '../features/Posts.reducers.actions';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    users: usersReducer,
    author: authorReducer,
    selectedPost: postReducer,
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
