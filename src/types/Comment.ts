export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type CommentRequiredFields = 'postId' | 'name' | 'email' | 'body';
export type CommentData = Pick<Comment, CommentRequiredFields>;
