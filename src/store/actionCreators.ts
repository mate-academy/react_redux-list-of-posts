import { PostsWithUserAndComments } from '../constants';
import { ActionTypes } from './actionTypes';

export const setPosts = (value: PostsWithUserAndComments[]) => ({
  type: ActionTypes.SET_POSTS,
  payload: value,
});
export const setLoading = (value: boolean) => ({
  type: ActionTypes.SET_LOADING,
  payload: value,
});
export const deletePost = (value: number) => ({
  type: ActionTypes.DELETE_POST,
  payload: value,
});
export const setQuery = (value: string) => ({
  type: ActionTypes.SET_QUERY,
  payload: value,
});
export const deleteComment = (value: number) => ({
  type: ActionTypes.DELETE_COMMENT,
  payload: value,
});
export const setError = (value: boolean) => ({
  type: ActionTypes.SET_ERROR,
  payload: value,
});
