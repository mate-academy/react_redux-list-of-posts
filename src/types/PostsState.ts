import { Post } from './Post';
import { User } from './User';

export type PostsState = {
  user: User | null,
  selectedPostId: number | null,
  selectValue: string,
  selectedPost: Post | null,
  isPostLoading: boolean,
};
