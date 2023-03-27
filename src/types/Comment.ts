export interface IComment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export type ICommentData = Pick<IComment, 'name' | 'email' | 'body'>;

export type ICommentDataToServer =
  Pick<IComment, 'name' | 'email' | 'body' | 'postId'>;
