import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersSlice from '../features/users';
import postsSlice from '../features/posts';
import commentsSlice from '../features/comments';
import commentFormSlice from '../features/commentForm';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: usersSlice,
    posts: postsSlice,
    comments: commentsSlice,
    commentForm: commentFormSlice,
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
