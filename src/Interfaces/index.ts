export interface IPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface IComment {
  id?: number;
  postId: number;
  body: string;
}
