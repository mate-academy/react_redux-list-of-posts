import { LOAD_POSTS } from './types';
import { Post } from '../Types/Post';

const initialState = {
  posts: [] as Post[],
};

export const postsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: action.data,
      };
    default:
      return state;
  }
};
