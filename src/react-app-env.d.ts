/// <reference types="react-scripts" />

export interface Post {
  id: number,
  userId: number,
  title: string,
  body: string,
  createdAt: string,
  updatedAt: string,
}

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
}

export interface Comment {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
}

export interface State {
  posts: Post[]
  users: User[]
  currentPostId: string,
  currentPost: Post | null,
  comments: Comment[] | null,
}

export interface NewComment {
  postId: number,
  name: string,
  email: string,
  body: string,
}
