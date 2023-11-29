import { createComment, getPostComments, deleteComment } from '../api/comments';
import { Comment } from '../types/Comment';

export const fetchComments = (postId: number) => {
  return new Promise<Comment[]>((resolve) => {
    setTimeout(() => {
      resolve(getPostComments(postId));
    }, 2000);
  });
};

export const removeComment = (commentId: number) => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve(deleteComment(commentId));
    }, 2000);
  });
};

export const addComment = (data: Omit<Comment, 'id'>) => {
  return new Promise<Comment>((resolve) => {
    setTimeout(() => {
      resolve(createComment(data));
    }, 2000);
  });
};
