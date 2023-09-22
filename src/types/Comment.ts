export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;
export type NewComment = Pick<Comment, 'name' | 'email' | 'body' | 'id'>;
