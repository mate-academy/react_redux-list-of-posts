import { AnyAction } from 'redux';
import { FullPostType } from '../utils/interfaces';
import { SET_POSTS, REMOVE_POST } from './actionTypes';

export const postsReducer = (state = [], action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;

    case REMOVE_POST:
      return state.filter((post: FullPostType) => post.id !== action.payload);

    default:
      return state;
  }
};
