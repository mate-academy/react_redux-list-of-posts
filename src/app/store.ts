import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authorSlice from '../features/authorSlice';
import commentsSlice from '../features/commentsSlice';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import postsSlice from '../features/postsSlice';
import selectedPostSlice from '../features/selectedPostSlice';
import userSlice from '../features/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userSlice,
    author: authorSlice,
    posts: postsSlice,
    selectedPost: selectedPostSlice,
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
