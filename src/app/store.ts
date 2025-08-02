import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import authorReducer from '../features/Author/AuthorSlice';
import usersReducer from '../features/Users/UsersSlice';
import commentsReduser from '../features/Comments/CommentsSlice';
import postReduser from '../features/Posts/PostsSlice';
import selectedPostReduser from '../features/SelectedPost/SelectedPost';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    author: authorReducer,
    users: usersReducer,
    comments: commentsReduser,
    posts: postReduser,
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
