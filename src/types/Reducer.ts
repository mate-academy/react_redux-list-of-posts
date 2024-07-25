import { Post } from './Post';
import { User } from './User';
import { Comment } from './Comment';

export interface UserState {
  users: User[];
  selectedUser: null | User;
}

export interface PostsState {
  posts: Post[];
  selectedPost: null | Post;
  hasError: boolean;
  loading: boolean;
}

export interface CommentsState {
  comments: Comment[];
  hasError: boolean;
  loading: boolean;
  visibleForm: boolean;
  submitting: boolean;
}
