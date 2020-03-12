import { Action } from 'redux';

export interface InitialState {
  inputValue: string;
  filterValue: string;
  isLoading: boolean;
  posts: FullPost[];
  isLoadSuccess: boolean;
  isLoadError: boolean;
}

export const initialState: InitialState = {
  inputValue: '',
  filterValue: '',
  isLoading: false,
  posts: [],
  isLoadSuccess: false,
  isLoadError: false,
};

export enum ActionType {
  SetInputValue,
  SetFilterValue,
  SetIsLoading,
  LoadData,
  SetIsLoadSuccess,
  SetIsLoadError,
}

export interface DispatchAction extends Action<ActionType> {
  payload: Partial<InitialState>;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface FullPost extends Post {
  user: User;
  comments: Comment[];
}
