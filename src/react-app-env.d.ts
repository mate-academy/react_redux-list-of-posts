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
  postsListSlice: PostsListSlice
}

type RootState = ReturnType<typeof rootReducer>;
