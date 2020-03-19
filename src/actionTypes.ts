import { Action as ReduxAction } from 'redux';

export const LOAD_POSTS = 'LOAD_POSTS';
export const SET_LOADING = 'SET_LOADING';
export const SET_STARTED = 'SET_STARTED';
export const SET_FILTER_QUERY = 'SET_FILTER_QUERY';
export const REMOVE_POST = 'REMOVE_POST';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

export enum ActionTypes {
  setPosts = 'LOAD_POSTS',
  setLoading = 'SET_LOADING',
  setStarted = 'SET_STARTED',
  setFilterQuery = 'SET_FILTER_QUERY',
  setRemovePost = 'REMOVE_POST',
  setRemoveComment = 'REMOVE_COMMENT',
}

export interface Action<T extends ActionTypes = ActionTypes, P = null> extends ReduxAction<T> {
  payload: P;
}

export type setPostsAction = Action<ActionTypes.setPosts, PostWithComments[]>;
export type setLoadingAction = Action<ActionTypes.setLoading, boolean>;
export type setStartedAction = Action<ActionTypes.setStarted, boolean>;
export type setFilterQueryAction = Action<ActionTypes.setFilterQuery, string>;
export type setRemovePostAction = Action<ActionTypes.setRemovePost, number>;
export type setRemoveCommentAction = Action<ActionTypes.setRemoveComment, number>;

export type Actions = setPostsAction
| setLoadingAction
| setStartedAction
| setFilterQueryAction
| setRemovePostAction
| setRemoveCommentAction;
