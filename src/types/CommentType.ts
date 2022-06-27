export interface CommentType {
  body: string,
  createdAt: string,
  updatedAt: string,
  name: string,
  id: number,
  postId: number,
  email: string,
}

export interface NewComment {
  name: string,
  email: string,
  body: string,
  postId: number,
}
