
export interface PostType {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface UserType {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AddressType;

}

export interface AddressType {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Object;
}

export interface CommentType {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

