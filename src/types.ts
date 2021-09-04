export interface PostMain {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Post extends PostMain {
  createdAt: string,
  updatedAt: string
}

export type Posts = {
  post: Post[],
};

export interface Comment {
  id?: number;
  postId: number;
  body: string;
}

export interface NewComment {
  id?: number;
  name: string;
  email?: string;
  body: string;
  postId: number;
}

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
  website: string,
  createdAt: string,
  updatedAt: string,
  address: {
    id: number,
    userId: number,
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    createdAt: string,
    updatedAt: string
  }
}

export type Users = {
  user: User[],
};

export type RootState = {
  posts: Post[]|[];
  postId: number;
  users: User[]|[];
  userId: number;
  user: User | Record<string|number, never>;
  loading: boolean;
  message: string|null
}
