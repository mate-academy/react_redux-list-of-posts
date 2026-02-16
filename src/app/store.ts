import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from '../features/counter/counterSlice';
import { UsersSlice } from '../features/users/usersSlice';
import { AuthorSlice } from '../features/author/aurhorSlice';
import { PostsSlice } from '../features/posts/postsSlice';
import { SelectedPostSlice } from '../features/selectedPost/selectedPostSlice';
import { CommentsSlice } from '../features/comments/comments';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: UsersSlice.reducer,
    author: AuthorSlice.reducer,
    posts: PostsSlice.reducer,
    selectedPost: SelectedPostSlice.reducer,
    comments: CommentsSlice.reducer,
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
