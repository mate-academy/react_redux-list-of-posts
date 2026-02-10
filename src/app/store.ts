import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import usersReduser from '../features/users/usersSlice';
import postsReduser from '../features/posts/postsSlice';
import authorReduser from '../features/author/authorSlice';
import commentsReduser from '../features/comments/commentsSlice';
import selectedPostReduser from '../features/selectedPost/selectedPostSlice';

export const store = configureStore({
  reducer: {
    users: usersReduser,
    posts: postsReduser,
    selectedPost: selectedPostReduser,
    author: authorReduser,
    comments: commentsReduser,
    counter: counterReducer,
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
