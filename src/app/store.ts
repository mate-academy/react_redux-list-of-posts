import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import { reducer as usersReducer } from '../features/posts/userList';
import { reducer as postsReducer } from '../features/posts/postsList';
import { reducer as selectUserReducer } from '../features/posts/selectUser';
import { reducer as selectPostReducer } from '../features/posts/selectedPost';
import { reducer as commentsReducer } from '../features/posts/comments';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    posts: postsReducer,
    author: selectUserReducer,
    selectPost: selectPostReducer,
    comments: commentsReducer,
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
