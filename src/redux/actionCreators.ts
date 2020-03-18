import { Dispatch } from 'redux';
import {
  SET_IS_LOADING,
  SET_IS_LOADED,
  SET_POSTS,
  SET_SEARCH_VALUE,
  SET_HAS_ERROR,
  DELETE_POST,
  DELETE_COMMENT,
} from './constants';
import { PreparedPost } from '../types';
import { getPreparedPosts } from '../api_helpers';

export const setIsLoading = (status: boolean) => ({
  type: SET_IS_LOADING,
  isLoading: status,
});

export const setHasError = (status: boolean) => ({
  type: SET_HAS_ERROR,
  hasError: status,
});

export const setIsLoaded = (status: boolean) => ({
  type: SET_IS_LOADED,
  isLoaded: status,
});

export const setPosts = (postsFromApi: PreparedPost[]) => ({
  type: SET_POSTS,
  posts: postsFromApi,
});

export const setSearchValue = (search: string) => ({
  type: SET_SEARCH_VALUE,
  searchValue: search,
});

export const deletePost = (id: number) => ({
  type: DELETE_POST,
  id,
});

export const deleteComment = (id: number) => ({
  type: DELETE_COMMENT,
  id,
});

export const showedAllPosts = () => async (dispatch: Dispatch) => {
  dispatch(setIsLoading(true));
  dispatch(setHasError(false));

  try {
    const postsFromApi = await getPreparedPosts();

    dispatch(setPosts(postsFromApi));
  } catch (error) {
    dispatch(setHasError(true));
  }

  dispatch(setIsLoading(false));
  dispatch(setIsLoaded(true));
};
