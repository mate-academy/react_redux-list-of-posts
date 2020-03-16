import { AnyAction } from 'redux';
import { FullPostType } from '../utils/interfaces';
import { SET_POSTS, REMOVER } from './actionTypes';

export const postsReducer = (state = [], action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return action.posts;

    case REMOVER:
      return state.filter((post: FullPostType) => post.id !== action.payload);

    default:
      return state;
  }
};
