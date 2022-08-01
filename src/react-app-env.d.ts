/// <reference types="react-scripts" />

export interface User {
  id: number,
  name: string,
}

export interface Post {
  id: number,
  userId: number,
  title: string,
  body: string,
}

export interface Comment {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
}

export interface NewComment {
  postId: number,
  name: string,
  email: string,
  body: string,
}

export interface State {
  users: User[],
  posts: Post[],
  selectedUserId: number,
  selectedPostId: number,
  postComments: Comment[],
}
