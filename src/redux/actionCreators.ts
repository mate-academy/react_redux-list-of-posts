import {
  SET_IS_LOADING,
  SET_IS_LOADED,
  SET_POSTS,
  SET_SEARCH_VALUE,
  SET_HAS_ERROR,
} from './constants';
import { PreparedPost } from '../types';

export const setIsLoading = (status: boolean) => ({
  type: SET_IS_LOADING,
  isLoading: status,
});

export const setHasError = (status: boolean) => ({
  type: SET_HAS_ERROR,
  hasError: status,
});

export const setIsLoaded = () => ({
  type: SET_IS_LOADED,
  isLoaded: true,
});

export const setPosts = (postsFromApi: PreparedPost[]) => ({
  type: SET_POSTS,
  posts: postsFromApi,
});

export const setSearchValue = (search: string) => ({
  type: SET_SEARCH_VALUE,
  searchValue: search,
});
