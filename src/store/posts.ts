import { AnyAction } from 'redux';
import { Post } from '../types/post';

const SET_POSTS = 'SET_POSTS';
const SET_LOAD_POSTS_ERROR = 'SET_LOAD_POSTS_ERROR';

export type PostsState = {
  posts: Post[],
  loadPostsError: boolean,
};

const initialState: PostsState = {
  posts: [],
  loadPostsError: false,
};

export const selectors = {
  getPosts: (state: PostsState) => state.posts,
  getLoadPostsError: (state: PostsState) => state.loadPostsError,
};

export const actions = {
  setPosts: (posts: Post[]) => ({ type: SET_POSTS, posts }),
  setLoadPostsError: () => ({ type: SET_LOAD_POSTS_ERROR }),
};

const postsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.posts,
      };

    case SET_LOAD_POSTS_ERROR:
      return {
        ...state,
        loadPostsError: true,
      };

    default:
      return state;
  }
};

export default postsReducer;
