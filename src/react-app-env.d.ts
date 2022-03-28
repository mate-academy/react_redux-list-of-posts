/// <reference types="react-scripts" />
type Post = {
  id: number,
  title: string,
  body: string,
  // comments: Comment[],
};

interface CommentType {
  id: number,
  postId: number,
  body: string,
  name: string,
  email: string,
}

interface newComment {
  postId: number,
  body: string,
  name: string,
  email: string,
}

type State = {
  posts: Post[],
  post: Post | null,
  postId: number,
  selectedPost: null | number;
  comments: CommentType[],
};

type Action = {
  type: string,
  payload: any,
};
