import { PostComment } from './Comment';

export interface CommentsState {
  items: PostComment[];
  loading: boolean;
  hasError: boolean;
}
