import { AnyAction } from 'redux';
import { PostType } from '../types';
import { LOADING_FINISH } from '.';

// Action types
export const SET_POSTS = 'SET_POSTS';

// Action creators
export const setPosts = (posts: PostType[]) => ({ type: SET_POSTS, posts });

const reducer = (posts = [], action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
    case LOADING_FINISH:
      return action.posts;
    default:
      return posts;
  }
};

export default reducer;
