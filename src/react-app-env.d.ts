// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface Users {
  id: number;
  name: string;
  email: string;
  address: Address;
}

interface Comments {
  postId: number;
  id: number;
  name: string;
  body: string;
  email: string;
}

interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PostWithUser {
  userId: number;
  id: number;
  title: string;
  body: string;
  user: Users;
  comments: Comments[];
}
