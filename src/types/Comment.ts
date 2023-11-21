export interface Comment {
  commentId: number;
  postId: number;
  name: string;
  email: string;
  commentBody: string;
}

export type CommentData = Pick<Comment, 'name' | 'email' | 'commentBody'>;
