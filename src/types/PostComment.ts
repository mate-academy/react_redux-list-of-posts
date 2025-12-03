export interface PostComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type PostCommentData = Pick<PostComment, 'name' | 'email' | 'body'>;
