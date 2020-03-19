import { AnyAction } from 'redux'
import { ActionTypes } from './actionTypes'

export const setPosts = (value: PostWithComments[]): AnyAction => ({
  type: ActionTypes.TYPE_SET_POSTS,
  value
});

export const setError = (value: boolean): AnyAction => ({
  type: ActionTypes.TYPE_SET_ERROR,
  value
});

export const setLoading = (value: boolean): AnyAction => ({
  type: ActionTypes.TYPE_SET_LOADING,
  value
});

export const setQuery = (value: string): AnyAction => ({
  type: ActionTypes.TYPE_SET_QUERY,
  value
});

export const setFilteredQuery = (value: string): AnyAction => ({
  type: ActionTypes.TYPE_SET_FILTERED_QUERY,
  value,
});

export const deletePost = (value: number): AnyAction => ({
  type: ActionTypes.TYPE_DELETE_POST,
  value
});

export const deleteComment = (postId: number, commentId: number): AnyAction => ({
  type: ActionTypes.TYPE_DELETE_COMMENT,
  postId,
  commentId,
});
