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

type User = {
  id: number,
  name: string,
  username: string,
  email: string,
};

type State = {
  posts: Post[],
  users: User[],
};

type Action = {
  type: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any,
};
