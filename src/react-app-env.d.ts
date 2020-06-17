// eslint-disable-next-line
/// <reference types="react-scripts" />

interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  address: {
    city: string;
    street: string;
    suite: string;
  };
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PreparedPost extends Post {
  user?: User;
  comments: Comment[];
}

/* interface RootState {
  posts: PreparedPost[];
  isLoading: boolean;
  errorMessage: string;
  filterQuery: string;
} */
