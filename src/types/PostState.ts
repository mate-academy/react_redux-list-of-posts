import { Post } from './Post';

export type PostsState = {
  items: Post[],
  loaded: boolean,
  hasError: boolean,
};
