export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface CommentData {
  name: string;
  email: string;
  body: string;
}
