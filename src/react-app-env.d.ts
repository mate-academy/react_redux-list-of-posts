// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Post {
  id: number;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
}

interface Comment {
  id: number;
  body: string;
}

type RootState = {
  users: User[];
  userId: number;
  posts: Post[];
  postId: number;
  postDetails: Post | null;
  comments: Comment[];
  isLoad: boolean;
};
