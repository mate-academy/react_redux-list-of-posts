import { User } from '../types/User';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';
import { LoadingStatus } from '../types/enums';

export type AppState = {
  users: {
    users: User[];
    selectedUser: User;
    status: LoadingStatus;
  };
  posts: Post[];
  selectedPost: Post;
  status: LoadingStatus;
  comments: Comment[];
};
