import { deleteComment, getPostComments } from '../../api/comments';
import { Comment } from '../../types/Comment';

export function fetchComments(postId: number) {
  return new Promise<Comment[]>((resolve, reject) => {
    try {
      const comments = getPostComments(postId);

      resolve(comments);
    } catch (error) {
      reject(error);
    }
  });
}

export function delComment(commentId: number) {
  return new Promise((resolve, reject) => {
    try {
      deleteComment(commentId);

      resolve(commentId);
    } catch (error) {
      reject(error);
    }
  });
}
