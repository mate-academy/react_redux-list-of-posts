// store.ts;
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer, { UsersState } from '../features/usersSlice';
import authorReducer, { AuthorState } from '../features/authorSlice';
import postsReducer, { PostsState } from '../features/postsSlice';
import selectedPostReducer, {
  SelectedPostState,
} from '../features/selectedPostSlice';
import commentsReducer, { CommentsState } from '../features/commentsSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    author: authorReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export interface RootState {
  users: UsersState;
  author: AuthorState;
  posts: PostsState;
  selectedPost: SelectedPostState;
  comments: CommentsState;
}

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
/* eslint-enable @typescript-eslint/indent */
