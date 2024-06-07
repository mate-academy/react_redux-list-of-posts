import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersReducer from '../features/usersSlice/usersSlice';
import authorReduser from '../features/authorSlice/authorSlice';
import postsReduser from '../features/postsSlice/postsSlice';
// eslint-disable-next-line max-len
import selectedPostReduser from '../features/selectedPostSlice/selectedPostSlice';
import commentsResurer from '../features/commentsSlice/commentsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    author: authorReduser,
    posts: postsReduser,
    selectedPost: selectedPostReduser,
    comments: commentsResurer,
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
