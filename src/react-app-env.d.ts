/// <reference types="react-scripts" />

export interface Post {
  id: number,
  userId: number,
  title: string,
  body: string,
  createdAt: string,
  updatedAt: string,
}

export interface NewComment {
  postId: number,
  name: string,
  email: string,
  body: string,
}

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
}

export interface Comment extends NewComment {
  id: number,
  createdAt: string,
  updatedAt: string,
}

export interface State {
  posts: Post[],
  selectedPost: Post | null,
  comments: Comment[],
}
