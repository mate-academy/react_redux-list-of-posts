import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import postsReducer from '../features/posts';
import usersReducer from '../features/users';
import authorReducer from '../features/author';
import selectedPostReducer from '../features/selectedPost';
import commentsReducer from '../features/comments';
import newCommentReducer from '../features/newComment';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    author: authorReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
    comments: commentsReducer,
    newComment: newCommentReducer,
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
