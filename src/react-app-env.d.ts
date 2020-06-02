// eslint-disable-next-line
/// <reference types="react-scripts" />

interface PostFromServer {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface Post extends PostFromServer {
  user?: User | undefined;
  comments?: Comment[] | undefined;
}

interface User {
  id: number;
  username: string;
  [key: string]: number | string | Address | Company;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

interface Address {
  [key: string]: string | Geo;
  geo: Geo;
}

interface Geo {
  [key: string]: string;
}

interface Company {
  [key: string]: string;
}
