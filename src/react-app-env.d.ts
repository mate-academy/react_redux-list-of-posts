/// <reference types="react-scripts" />

interface Post {
  body: string,
  createdAt: string,
  id: number,
  title: string,
  updatedAt: string,
  userId: number,
}

interface Comment {
  body: string,
  createdAt: string,
  email: string,
  id: number,
  name: string,
  postId: number,
  updatedAt: string,
}

interface NewComment {
  postId: number,
  name: string,
  email: string,
  body: string,
}

interface User {
  createdAt: string,
  email: string,
  id: number,
  name: string,
  phone: string,
  updatedAt: string,
  username: string,
  website: string,
}

interface State {
  posts: Post[],
  users: User[]
  selectedPostId: number,
  selectedPost: Post | null,
  postComments: Comment[],
}
