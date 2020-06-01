import { AnyAction } from 'redux';
import { PostType } from '../types';

// Action types
export const SET_POSTS = 'SET_POSTS';

// Action creators
export const setPostsCreator = (posts: PostType[]) => ({ type: SET_POSTS, posts });

const reducer = (posts = [], action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;
    default:
      return posts;
  }
};

export default reducer;
