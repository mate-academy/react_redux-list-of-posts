import { Post } from './Post';

export interface PostsState {
  items: Post[];
  loaded: boolean;
  hasError: boolean;
}
