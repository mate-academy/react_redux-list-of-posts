import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import { authorReducer } from '../features/authorSlice';
import { commentReducer } from '../features/commentSlice';
import { postsReducer } from '../features/postsSlice';
import { selectedPostReducer } from '../features/selectedPostSlice';
import { usersReducer } from '../features/usersSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    author: authorReducer,
    comments: commentReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
    users: usersReducer,
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
