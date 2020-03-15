import { Action as ReduxAction } from 'redux';

export enum ActionTypes {
  setPosts = 'LOAD_POSTS',
  setLoading = 'SET_LOADING',
  setStarted = 'SET_STARTED',
  setQuery = 'SET_QUERY',
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
export type setQueryAction = Action<ActionTypes.setQuery, string>;
export type setFilterQueryAction = Action<ActionTypes.setFilterQuery, string>;
export type setRemovePostAction = Action<ActionTypes.setRemovePost, number>;
export type setRemoveCommentAction = Action<ActionTypes.setRemoveComment, number>;

export type Actions = setPostsAction
| setLoadingAction
| setStartedAction
| setQueryAction
| setFilterQueryAction
| setRemovePostAction
| setRemoveCommentAction;
