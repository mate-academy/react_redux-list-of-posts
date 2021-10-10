import { AnyAction } from 'redux';
import { Dispatch } from 'react';

import { getPosts, getUserPosts } from '../api/posts';

const SET_POSTS = 'SET_POSTS';
const SET_USER_POSTS = 'SET_USER_POSTS';

export const setPosts = () => (dispatch: Dispatch<any>) => {
  getPosts()
    .then(receivedFromServerPosts => {
      dispatch({
        type: SET_POSTS,
        payload: receivedFromServerPosts,
      });
    });
};

export const setUserPosts = (userSelect: string) => (dispatch: Dispatch<any>) => {
  getUserPosts(userSelect)
    .then(receivedFromServerUserPosts => {
      dispatch({
        type: SET_USER_POSTS,
        payload: receivedFromServerUserPosts,
      });
    });
};

const initialState: PostState = {
  posts: [],
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    case SET_USER_POSTS:
      return {
        ...state,
        posts: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
