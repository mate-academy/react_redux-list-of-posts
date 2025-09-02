import { PostComment } from './Comment';

export interface CommentsState {
  items: PostComment[];
  loaded: boolean;
  hasError: boolean;
}
