import {
  createComment,
  deleteComment,
  getPostComments,
} from '../../api/comments';
import { CommentData } from '../../types/Comment';

export function fetchComments(postId: number) {
  return getPostComments(postId);
}

export function fetchCreateComments(data: CommentData) {
  return createComment(data);
}

export function fetchDeleteComments(commentId: number) {
  return deleteComment(commentId);
}
