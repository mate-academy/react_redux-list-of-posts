import { User } from './User';
import { Post } from './Post';
import { Comment } from './Comment';

export interface UsersState {
  loaded: boolean;
  hasError: boolean;
  items: User[];
}

export interface AuthorState {
  author: User | null;
}

export interface PostsState {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
}

export interface SelectedPostState {
  selectedPost: Post | null;
}

export interface CommentsState {
  loaded: boolean;
  hasError: boolean;
  items: Comment[];
}
