import {
  START_LOADING,
  FINISH_LOADING, INIT_POSTS, SET_QUERY,
} from './types';


export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = () => ({ type: FINISH_LOADING });


export const initPosts = (posts: Post[]) => ({
  type: INIT_POSTS,
  posts,
});


export const setQuery = (query: string) => ({
  type: SET_QUERY,
  query,
});
