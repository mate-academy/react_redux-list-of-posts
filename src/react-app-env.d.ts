/// <reference types="react-scripts" />

type Post = {
  id: number,
  userId: number,
  title: string,
  body: string,
  createdAt: string,
  updatedAt: string,
};

interface PostComment extends Post{
  postId: number
}

type NewComment = {
  name: string,
  email: string,
  body: string,
  postId: number
};

type User = {
  id: number,
  name: string,
};

type RootState = {
  posts: Post[],
  userId: number,
  comments: PostComment[],
  selectedPostId: number,
  postDetails: Post | null,
};
