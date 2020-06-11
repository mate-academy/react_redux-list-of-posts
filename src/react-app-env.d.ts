// eslint-disable-next-line
/// <reference types="react-scripts" />

interface Comments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  email: boolean;
  address: Address;
  company: Company;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  user?: User;
  comments: Comments[];
}
