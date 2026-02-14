import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import authorReducer from '../features/Author/AuthorSlice';
import usersReducer from '../features/Users/UsersSlice';
import commentsReducer from '../features/Comments/CommentsSlice';
import postReducer from '../features/Posts/PostsSlice';
import selectedPostReducer from '../features/SelectedPost/SelectedPost';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    author: authorReducer,
    users: usersReducer,
    comments: commentsReducer,
    posts: postReducer,
    selectedPost: selectedPostReducer,
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
