// eslint-disable-next-line
/// <reference types="react-scripts" />

export interface Post {
  id: number,
  userId: number,
  body: string,
  title: string,
  createdAt: string,
  updatedAt: string,
}

export interface User {

  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
  createdAt: string,
  updatedAt: string,
  address: {
    id: number,
    userId: number,
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    createdAt: string,
    updatedAt: string,

  }
}

export interface Comment{
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string,
  createdAt: string,
  updatedAt: string,
}

export interface State {
  posts: Post[],
  selectedPostId: number | null,
  selectedPost: Post | null,
  currentUserId: number | null,
  needToUpdate: boolean,
  allUsers: User[],
  commentsList: Comment[],
}

export interface Action {
  type: string,
  payload: any,
}
