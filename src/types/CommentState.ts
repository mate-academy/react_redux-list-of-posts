import { Comment } from './Comment';

export interface CommentState {
  comment: Comment[];
  loaded: boolean;
  hasError: string;
}
