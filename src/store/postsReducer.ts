import { AnyAction } from 'redux';
import { Posts } from '../components/Interfaces';

const SET_POSTS = 'SET_POSTS';

export const setPosts = (payload: Posts) => ({ type: SET_POSTS, payload });

const reducer = (posts = [], action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return action.payload;

    default:
      return posts;
  }
};

export default reducer;
