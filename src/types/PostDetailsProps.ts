import { Post } from './Post';
import { Comment as CommentType } from './Comment';

export interface PostDetailsProps {
  post: Post | null;
  comments: CommentType[];
  commentsLoading: boolean;
  commentsError: boolean;
  onDeleteComment: (id: number) => void;
}
