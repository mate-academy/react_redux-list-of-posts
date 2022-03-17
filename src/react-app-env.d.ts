// eslint-disable-next-line
/// <reference types="react-scripts" />

type Post = {
  id: number,
  userId: number,
  title: string,
  body: string,
  createdAt: string,
  updatedAt: string,
};

type State = {
  posts: Post[],
};

type Action = {
  type: string,
  payload: any,
};
