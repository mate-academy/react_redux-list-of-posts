import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersSlice from '../features/usersSlice';
import postsSlice from '../features/postsSlice';
import commentsSlice from '../features/commentsSlice';
import selectedPostSlice from '../features/selectedPostSlice';
import authorSlice from '../features/authorSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersSlice,
    posts: postsSlice,
    comments: commentsSlice,
    author: authorSlice,
    selectedPost: selectedPostSlice,
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
