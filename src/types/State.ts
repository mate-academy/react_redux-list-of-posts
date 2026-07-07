import { User } from './User';
import { Post } from './Post';
import { Comment } from './Comment';

export interface State {
  users: User[];
  author: User | null;

  posts: {
    items: Post[];
    loaded: boolean;
    hasError: boolean;
  };

  selectedPost: Post | null;

  comments: {
    items: Comment[];
    loaded: boolean;
    hasError: boolean;
  };
}
