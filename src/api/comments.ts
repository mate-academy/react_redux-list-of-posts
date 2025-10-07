// Canonical comments API
import { client } from '../utils/fetchClient';
import { Comment } from '../types/Comment';

// Fetch all comments for a given post
export const getComments = (postId: number): Promise<Comment[]> => {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
};

// Create a new comment
export const createComment = (data: Omit<Comment, 'id'>): Promise<Comment> => {
  return client.post<Comment>('/comments', data);
};

// Delete a comment by id
export const deleteComment = (commentId: number): Promise<void> => {
  return client.delete(`/comments/${commentId}`) as Promise<void>;
};

// Backwards-compat alias (if any imports still use the old name)
export const getPostComments = getComments;
