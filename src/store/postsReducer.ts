import { AnyAction } from 'redux';
import { Post } from '../types/Post';

type State = {
  posts: Post[],
  selectedPost: number,
};

const defaultState: State = {
  posts: [],
  selectedPost: -1,
};

const FETCH_POSTS = 'FETCH_POSTS';
const SHOW_POST_INFO = 'SHOW_POST_INFO';

export const postsReducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        posts: [...action.payload],
      };

    case SHOW_POST_INFO:
      return {
        ...state,
        selectedPost: action.payload,
      };

    default:
      return state;
  }
};

export const fetchPostsAction = (payload: Post[]) => ({ type: FETCH_POSTS, payload });
export const showPostInfoAction = (payload: number) => ({ type: SHOW_POST_INFO, payload });
