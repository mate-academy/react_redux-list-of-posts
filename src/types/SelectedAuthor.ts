import { Post } from './Post';
import { User } from './User';

export type SelectedAuthor = {
  author: User | null,
  posts: Post[],
  loaded: boolean,
  hasError: boolean,
};
