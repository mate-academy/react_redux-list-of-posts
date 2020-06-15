// eslint-disable-next-line
/// <reference types="react-scripts" />
interface PostFromServer {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface UserFromServer {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface CommentFromServer {
  postId: number;
  id: number;
  name: string;
  email: string;
  pbody: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  postUser: UserFromServer;
  postComment: CommentFromServer[];
}
