import { getPostComments } from '../../api/comments';

export function loadComments(postId: number) {
  return getPostComments(postId);
}
