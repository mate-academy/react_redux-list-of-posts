import { createComment } from '../../api/comments';
import { Comment } from '../../types/Comment';

export function addComment(data: Omit<Comment, 'id'>) {
  return new Promise<Comment>((resolve, reject) => {
    try {
      const comment = createComment(data);

      resolve(comment);
    } catch (error) {
      reject(error);
    }
  });
}
