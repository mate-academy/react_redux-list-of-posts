import { AnyAction } from 'redux';
import { Post } from '../types/Post';

// Action types
const SET_POSTS = 'SET_POSTS';

// Action creators
export const setPosts = (posts: Post[] | null) => ({ type: SET_POSTS, posts });

const reducer = (posts = [], action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;

    default:
      return posts;
  }
};

export default reducer;
