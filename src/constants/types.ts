import { Action as ReduxAction } from 'redux';

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
  DeletePost,
  DeleteComment,
}

interface SetInputValueAction extends ReduxAction {
  type: ActionType.SetInputValue;
  payload: string;
}

interface SetFilterValueAction extends ReduxAction {
  type: ActionType.SetFilterValue;
  payload: string;
}

interface SetIsLoadingAction extends ReduxAction {
  type: ActionType.SetIsLoading;
  payload: boolean;
}

interface LoadDataAction extends ReduxAction {
  type: ActionType.LoadData;
  payload: FullPost[];
}

interface SetIsLoadSuccessAction extends ReduxAction {
  type: ActionType.SetIsLoadSuccess;
  payload: boolean;
}

interface SetIsLoadErrorAction extends ReduxAction {
  type: ActionType.SetIsLoadError;
  payload: boolean;
}

interface DeletePostAction extends ReduxAction {
  type: ActionType.DeletePost;
  payload: number;
}

interface DeleteCommentAction extends ReduxAction {
  type: ActionType.DeleteComment;
  payload: {
    postId: number;
    commentId: number;
  };
}

export type Action = (
  SetInputValueAction
  | SetFilterValueAction
  | SetIsLoadingAction
  | LoadDataAction
  | SetIsLoadSuccessAction
  | SetIsLoadErrorAction
  | DeletePostAction
  | DeleteCommentAction
);

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
