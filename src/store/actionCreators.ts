import { Dispatch } from 'redux';
import { getPosts, getUsers, getComments } from '../utils/api';
import { UserType, CommentType, PostType } from '../utils/interfaces';
import {
  SET_POSTS,
  SET_USERS,
  SET_COMMENTS,
  SET_LOADING,
  SET_ERROR,
  SET_IS_LOADED,
  SET_QUERY,
  REMOVER,
  REMOVE_COMMENT,
} from './actionTypes';

export const setPosts = (posts: PostType[]) => ({
  type: SET_POSTS,
  posts,
});

export const setUsers = (users: UserType[]) => ({
  type: SET_USERS,
  users,
});

export const setComments = (comments: CommentType[]) => ({
  type: SET_COMMENTS,
  comments,
});

export const startLoading = () => ({
  type: SET_LOADING,
  payload: true,
});

export const stopLoading = () => ({
  type: SET_LOADING,
  payload: false,
});

export const setIsLoaded = () => ({
  type: SET_IS_LOADED,
  payload: true,
});

export const isError = () => ({
  type: SET_ERROR,
  payload: true,
});

export const setQuery = (query: string) => ({
  type: SET_QUERY,
  payload: query,
});

export const remover = (id: number) => ({
  type: REMOVER,
  payload: id,
});

export const removeComment = (id: number | string, postId: number) => ({
  type: REMOVE_COMMENT,
  payload: {
    id,
    postId,
  },
});

export const loadData = () => {
  return (dispatch: Dispatch) => {
    dispatch(startLoading());

    return Promise
      .all([
        getPosts(),
        getUsers(),
        getComments(),
      ])
      .then(([loadedPosts, loadedUsers, loadedComments]) => {
        dispatch(setPosts(loadedPosts));
        dispatch(setComments(loadedComments));
        dispatch(setUsers(loadedUsers));
        dispatch(setIsLoaded());
      })
      .catch(() => {
        dispatch(isError());
      })
      .finally(() => dispatch(stopLoading()));
  };
};
