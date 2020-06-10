export interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
  user: User;
  comments: Comment[];
}

export interface User{
  id: number;
  name: string;
  email: string;
  address: Address;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}
