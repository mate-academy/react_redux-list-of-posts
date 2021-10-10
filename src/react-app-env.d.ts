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

interface IComment {
  postId: number,
  name: string,
  email: string,
  body: string,
}

type PostState = {
  posts: Post[],
}

type UserIdState = {
  selectedUser: string,
}

type PostIdState = {
  selectedPost: number | null,
}

type PostDetailsState = {
  postDetails: Post | null,
}

interface CommentsState {
  comments: any[],
}
