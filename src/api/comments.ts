import { client } from '../utils/fetchClient';

import { IComment } from '../types/Comment.interface';

export const getPostComments = (postId: number) => (
  client.get<IComment[]>(`/comments?postId=${postId}`)
);

type TCommentFields = 'name' | 'email' | 'body' | 'postId';
export type TCommentToPost = Pick<IComment, TCommentFields>;

export const postNewComment = (comment: TCommentToPost) => (
  client.post<IComment>('/comments', comment)
);

export const deleteComment = (commentId: number) => (
  client.delete(`/comments/${commentId}`)
);
