import { AnyAction } from 'redux';
import { Post } from '../types/Post';

// Action types
const SET_POST_DETAILS = 'SET_POST_DETAILS';

// Action creators
export const setPost
  = (post: Post | null) => ({ type: SET_POST_DETAILS, post });

const reducer = (post = null, action: AnyAction) => {
  switch (action.type) {
    case SET_POST_DETAILS:
      return action.post;

    default:
      return post;
  }
};

export default reducer;
