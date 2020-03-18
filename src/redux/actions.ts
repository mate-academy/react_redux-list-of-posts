import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { getPosts, getUsers, getComments } from '../api/getData';

export const type = {
  SET_IS_LOADED: 'SET_IS_LOADED',
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_QUERY: 'SET_QUERY',
  SET_POSTS: 'SET_POSTS',
  SET_USERS: 'SET_USERS',
  SET_COMMENTS: 'SET_COMMENTS',
  DELETE_POST: 'DELETE_POST',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

export const setDeletePost = (id: number) => ({
  type: type.DELETE_POST,
  id,
});

export const setDeleteComment = (id: number) => ({
  type: type.DELETE_COMMENT,
  id,
});

export const setIsLoaded = (value: boolean) => ({
  type: type.SET_IS_LOADED,
  isLoaded: value,
});

export const setIsLoading = (value: boolean) => ({
  type: type.SET_IS_LOADING,
  isLoading: value,
});

export const setQuery = (value: string) => ({
  type: type.SET_QUERY,
  query: value,
});

export const setPosts = (posts: PostInterface[]) => ({
  type: type.SET_POSTS,
  posts,
});

export const setUsers = (users: UserInterface[]) => ({
  type: type.SET_USERS,
  users,
});

export const setComments = (comments: CommentInterface[]) => ({
  type: type.SET_COMMENTS,
  comments,
});

export const loadData = () => {
  return (dispatch: ThunkDispatch<LoadState&DataState, unknown, Action>) => {
    dispatch(setIsLoading(true));

    Promise.all([getPosts(), getUsers(), getComments()])
      .then(([posts, users, comments]) => {
        dispatch(setPosts(posts));
        dispatch(setUsers(users));
        dispatch(setComments(comments));
        dispatch(setIsLoaded(true));
      })
      .finally(() => dispatch(setIsLoading(false)));
  };
};
