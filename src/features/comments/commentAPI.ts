import { client } from '../../utils/fetchClient';
import { Comment } from '../../types/Comment';

export function fetchComments(postId: number) {
  return client.get<Comment[]>(`/comments?postId=${postId}`);
}

export function postComments(data: Comment) {
  return client.post<Comment>('/comments', data);
}

export function deleteComments(commentID: number) {
  return client.delete(`/comments/${commentID}`);
}
