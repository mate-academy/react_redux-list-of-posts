import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import authorReduser from '../features/authorSlice';
import setSelctedPost from '../features/selectedPostSlice';
import usersReduser from '../features/usersSlice';
import postsReduser from '../features/postsSlice';
import commentsReduser from '../features/commentsSlice';

export const store = configureStore({
  reducer: {
    author: authorReduser,
    selectedPost: setSelctedPost,
    users: usersReduser,
    posts: postsReduser,
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
