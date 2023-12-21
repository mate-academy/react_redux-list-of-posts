import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersSlice from '../features/usersSlice';
import authorSlice from '../features/authorSlice';
import selectedPostSlice from '../features/selectedPostSlice';
import postsSlice from '../features/postsSlice';
import commentsSlice from '../features/commentsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersSlice,
    author: authorSlice,
    selectedPost: selectedPostSlice,
    posts: postsSlice,
    comments: commentsSlice,
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
