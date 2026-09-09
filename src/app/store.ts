import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
// import counterReducer from '../features/counter/counterSlice';
import usersReduser from '../features/users';
import postsReduser from '../features/posts';
import commentsReduser from '../features/comments';
import authorReduser from '../features/author';
import selectedPostReduser from '../features/selectedPost';

export const store = configureStore({
  reducer: {
    users: usersReduser,
    posts: postsReduser,
    comments: commentsReduser,
    author: authorReduser,
    selectedPost: selectedPostReduser,
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
