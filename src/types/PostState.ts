import { Post } from './Post';

export interface PostState {
  posts: Post[];
  loaded: boolean;
  hasError: string | null;
}
