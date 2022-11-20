import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

export type AppState = {
  users: {
    users: User[];
    selectedUser: User;
    status: 'idle' | 'loading' | 'failed';
  };
  posts: Post[];
  selectedPost: Post;
  status: 'idle' | 'loading' | 'failed';
  comments: Comment[];
};
