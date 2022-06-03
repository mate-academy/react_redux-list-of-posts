// eslint-disable-next-line
/// <reference types="react-scripts" />
type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
};

type Commentary = {
  id: number;
  postId: number | null;
  name: string;
  email: string;
  body: string;
};
