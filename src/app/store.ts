import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authorReducer } from '../features/author/authorReducer';
import { commentsReducer } from '../features/comments/commentsReducer';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import { postReducer } from '../features/post/postReducer';
import { postsReducer } from '../features/posts/postsReducer';
import { usersReducer } from '../features/users/usersReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    posts: postsReducer,
    comments: commentsReducer,
    selectedAuthor: authorReducer,
    selectedPost: postReducer,
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
