import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authorSlice from '../feature/authorSlice';
import commentsSlice from '../feature/commentsSlice';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import postsSlice from '../feature/postsSlice';
import selectedPostSlice from '../feature/selectedPostSlice';
import userSlice from '../feature/userSlice';

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
