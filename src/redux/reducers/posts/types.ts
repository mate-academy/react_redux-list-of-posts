import { CommentType, NewComment } from '../../../types/CommentType';
import { Details } from '../../../types/Details';
import { Post } from '../../../types/Post';

export enum ActionTypes {
  SET_POSTS = 'SET_POSTS',
  SET_ACTIVE_POST = 'SET_ACTIVE_POST',
  SET_COMMENTS = 'SET_COMMETNS',
  DELETE_COMMENT = 'DELETE_COMMENT',
  SET_DETAILS = 'SET_DETAILS',
  ADD_COMMENT = 'ADD_COMMENT',
}

export interface SetPostsAction {
  type: ActionTypes.SET_POSTS,
  payload: Post,
}

export interface SetActivePostAction {
  type: ActionTypes.SET_ACTIVE_POST,
  payload: number | null,
}

export interface SetPostDetailsAction {
  type: ActionTypes.SET_DETAILS,
  payload: Details,
}

export interface SetCommentsAction {
  type: ActionTypes.SET_COMMENTS,
  payload: CommentType[],
}

export interface AddNewCommentAction {
  type: ActionTypes.ADD_COMMENT,
  payload: NewComment,
}

export interface DeleteCommentAction {
  type: ActionTypes.DELETE_COMMENT,
  payload: number,
}

export type PostAction =
  SetPostsAction |
  SetActivePostAction |
  SetPostDetailsAction |
  SetCommentsAction |
  AddNewCommentAction |
  DeleteCommentAction;
