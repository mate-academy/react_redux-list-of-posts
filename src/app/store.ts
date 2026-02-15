import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer, { CounterState } from '../features/counter/counterSlice';
import usersReducer, { UsersState } from '../features/users/usersSlice';
import authorReducer, { AuthorState } from '../features/author/authorSlice';
import postsReducer, { PostsState } from '../features/posts/postsSlice';
import selectedPostReducer, {
  SelectedPostState,
} from '../features/selectedPost/selectedPostSlice';
import commentsReducer, {
  CommentsState,
} from '../features/comments/commentsSlice';

// Визначаємо тип RootState явно
export interface RootState {
  counter: CounterState;
  users: UsersState;
  author: AuthorState;
  posts: PostsState;
  selectedPost: SelectedPostState;
  comments: CommentsState;
}

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
    author: authorReducer,
    posts: postsReducer,
    selectedPost: selectedPostReducer,
    comments: commentsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

// prettier-ignore
// eslint-disable-next-line @typescript-eslint/indent
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
