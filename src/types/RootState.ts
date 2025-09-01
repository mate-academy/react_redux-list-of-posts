import { CommentsState } from './CommentsState';
import { PostsState } from './PostsState';
import { UsersState } from './UsersState';

export interface RootState {
  users: UsersState;
  posts: PostsState;
  comments: CommentsState;
}
