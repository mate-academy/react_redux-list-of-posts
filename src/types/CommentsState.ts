import { Comment } from './Comment';

export type CommentsState = {
  items: Comment[],
  loaded: boolean,
  hasError: boolean,
};
