import { CommentsState } from './CommentsState';
import { PostsState } from './PostsState';
import { UIState } from './UIState';
import { UsersState } from './UsersState';

export interface RootState {
  users: UsersState;
  posts: PostsState;
  comments: CommentsState;
  ui: UIState;
}
