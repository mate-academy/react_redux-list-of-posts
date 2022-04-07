import { AnyAction } from 'redux';
import { TPost } from '../types';

// Action types
const SET_POSTS = 'SET_POSTS';

// Action creators
export const setPosts = (posts: TPost[]) => ({
  type: SET_POSTS,
  payload: posts,
});

// message reducer receives only the `state.message` part, but not the entire Redux state
const reducer = (posts = [], action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return action.payload;

    default:
      return posts;
  }
};

export default reducer;
