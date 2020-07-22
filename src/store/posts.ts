import { AnyAction } from 'redux';
import { Post } from '../interfaces/interfaces';

const SET_POSTS_LIST = 'SET_POSTS_LIST';

export const setPostsList = (posts: Post[]) => ({ type: SET_POSTS_LIST, posts });

const reducer = (posts: Post[] = [], action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS_LIST:

      return [...action.posts];

    default:
      return posts;
  }
};

export default reducer;
