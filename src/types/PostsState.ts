import { Post } from './Post';

export interface PostsState {
  items: Post[];
  loading: boolean;
  hasError: boolean;
}
