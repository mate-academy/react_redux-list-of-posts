export interface Post {
  id: number,
  userId: number,
  title: string,
  body: string,
}

export interface Comment {
  id?: number,
  postId: number,
  body: string,
}

export interface RootStatePosts {
  posts: any[];
  postId: number;
  userId: number;
};

export interface RootStatePost {
  post: Post | null;
  comments: Comment[];
}
