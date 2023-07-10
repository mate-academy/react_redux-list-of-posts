import { AuthorState } from '../features/author/authorSlice';
import { CommentsState } from '../features/comments/commentsSlice';
import { CounterState } from '../features/counter/counterSlice';
import { PostState } from '../features/posts/postsSlice';
import { SelectedPostState } from '../features/selectedPost/selectedPostSlice';
import { UsersState } from '../features/users/usersSlice';

export type State = {
  counter: CounterState;
  users: UsersState;
  author: AuthorState;
  posts: PostState;
  selectedPost: SelectedPostState;
  comments: CommentsState;
};
