import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { reducer as usersReducer } from '../features/users/usersSlice';
import { reducer as authorReducer } from '../features/author/authorSlice';
import { reducer as postReducer } from '../features/posts/postsSlice';
import { reducer as selectedPostReducer }
  from '../features/selectedPost/selectedPostSlice';
import { reducer as commentsReducer }
  from '../features/comments/commemtsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    author: authorReducer,
    posts: postReducer,
    selectedPost: selectedPostReducer,
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
