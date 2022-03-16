import { Dispatch } from 'react';
import { BASE_URL } from '../../helpers/api';
import { PostsAction, PostsActionTypes } from '../types/posts';

export const fetchPosts = (selectedUserId: number | null) => {
  return async (dispatch: Dispatch<PostsAction>) => {
    let response;

    try {
      dispatch({ type: PostsActionTypes.FETCH_POSTS });
      if (!selectedUserId) {
        response = await fetch(`${BASE_URL}/posts`);
      } else {
        response = await fetch(`${BASE_URL}/posts?userId=${selectedUserId}`);
      }

      const postsFromServer = response.json();

      dispatch({
        type: PostsActionTypes.FETCH_POSTS_SUCCESS,
        payload: await postsFromServer,
      });
    } catch (error) {
      dispatch({
        type: PostsActionTypes.FETCH_POSTS_ERROR,
        payload: 'An error occurred while loading posts. Please contact our support.',
      });
    }
  };
};

export const setSearchQuery = (query: string): PostsAction => {
  return ({ type: PostsActionTypes.SET_SEARCH_QUERY, payload: query });
};
