import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import postsSlice from '../features/postsSlice';
import commentsSlice from '../features/commentsSlice';
import usersSlice from '../features/usersSlice';
import authorSlice from '../features/authorSlice';
import selectedPostSlice from '../features/selectedPostSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsSlice,
    comments: commentsSlice,
    users: usersSlice,
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
