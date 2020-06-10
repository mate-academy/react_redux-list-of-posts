// eslint-disable-next-line
/// <reference types="react-scripts" />

interface User {
  id: number;
  name: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  user?: User;
  comments? : Comment[];
}
interface Comment {
  postId: number;
  id: number;
  email: string;
  name: string;
  body: string;
}
