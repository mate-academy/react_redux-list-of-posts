// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

interface PostsListSlice {
  posts: Post[];
  selectedPostId: number;
}

interface PostsState {
  postsListSlice: PostsListSlice;
  postDetailsSlice: PostDetailsSlice;
  commentsSlice: CommentsSlice;
}

type RootState = ReturnType<typeof rootReducer>;

interface PostDetailsSlice {
  body: string,
  createdAt: string,
  id: number,
  title: string,
  updatedAt: string,
  userId: number,
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

interface CommentsSlice {
  comments: Comment[];
}
