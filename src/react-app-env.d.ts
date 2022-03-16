// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Post {
  id: number,
  createdAt: string,
  updatedAt: string,
  userId: number,
  title: string,
  body: string,
}

interface State {
  posts: Post[],
  userId: number,
  users: User[],
  postId: number,
  comments: Comment[],
  newComment: NewComment,
  isCommentsHidden: boolean,
}

interface Action {
  type: string,
  payload: any,
}

interface User {
  id: number,
  createdAt: string,
  updatedAt: string,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string
}

interface Comment {
  id: number,
  createdAt: string,
  updatedAt: string,
  postId: number,
  name: string,
  email: string,
  body: string,
}

interface NewComment {
  postId: number,
  name: string,
  email: string,
  body: string,
}
