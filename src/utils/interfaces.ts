export interface UserType {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Geo {
  lat: number;
  lng: number;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface CommentType {
  postId: number;
  id: number | string;
  name: string;
  email: string;
  body: string;
}

export interface PostType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface FullPostType extends PostType {
  user: UserType;
  comments: CommentType[];
}

export interface RootState {
  posts: PostType[];
  users: UserType[];
  comments: CommentType[];
  isLoaded: boolean;
  isLoading: boolean;
  isError: boolean;
  query: string;
}
