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
  loaded: boolean;
}

export interface CommentsState {
  comments: Comment[];
  hasError: boolean;
  loaded: boolean;
  visibleForm: boolean;
  submitting: boolean;
}
