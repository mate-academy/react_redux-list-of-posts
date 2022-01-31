import { Comment } from './Comment';
import { Post } from './Post';
import { User } from './User';

export type RootState = {
  postsReducer: {
    posts: Post[],
    selectedPost: number,
  },
  usersReducer: {
    users: User[],
  },
  commentsReducer: {
    comments: Comment[],
  };
};
