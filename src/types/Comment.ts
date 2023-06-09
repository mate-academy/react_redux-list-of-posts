export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type CommentData = Pick<Comment, 'name' | 'email' | 'body'>;
export type CommentServerData =
  Pick<Comment, 'name' | 'email' | 'body' | 'postId'>;
