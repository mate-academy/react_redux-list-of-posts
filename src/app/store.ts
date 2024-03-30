import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersReduser from '../features/users';
import authorReduser from '../features/author';
import postsReduser from '../features/posts';
import selectedPostReduser from '../features/selectedPost';
import commentsReduser from '../features/comments';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReduser,
    author: authorReduser,
    posts: postsReduser,
    selectedPost: selectedPostReduser,
    comments: commentsReduser,
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
