// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  user: User;
  comments: Comment[];
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
