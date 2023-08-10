import { Post } from './Post';
import { Comment } from './Comment';

export type SelectedPost = {
  loaded: boolean,
  hasError: boolean,
  post: Post | null,
  comments: Comment[],
  submittingError: boolean,
  submitting: boolean,
};
