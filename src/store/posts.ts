import { AnyAction } from 'redux';
import { Post } from '../types/post';

const SET_POSTS = 'SET_POSTS';
const SET_LOAD_POSTS_ERROR = 'SET_LOAD_POSTS_ERROR';
const SET_SELECTED_POST_ID = 'SET_SELECTED_POST_ID';
const SET_POST_DETAILS = 'SET_POST_DETAILS';
const SET_LOAD_DETAILS_ERROR = 'SET_LOAD_DETAILS_ERROR';

export type PostsState = {
  posts: Post[],
  loadPostsError: boolean,
  selectedPostId: number | null,
  postDetails: Post | null,
  loadDetailsError: boolean,
};

const initialState: PostsState = {
  posts: [],
  loadPostsError: false,
  selectedPostId: null,
  postDetails: null,
  loadDetailsError: false,
};

export const selectors = {
  getPosts: (state: PostsState) => state.posts,
  getLoadPostsError: (state: PostsState) => state.loadPostsError,
  getSelectedPostId: (state: PostsState) => state.selectedPostId,
  getPostDetails: (state: PostsState) => state.postDetails,
  getLoadDetailsError: (state: PostsState) => state.loadDetailsError,
};

export const actions = {
  setPosts: (posts: Post[]) => ({ type: SET_POSTS, posts }),
  setLoadPostsError: () => ({ type: SET_LOAD_POSTS_ERROR }),
  setSelectedPostId: (selectedPostId: number | null) => {
    return { type: SET_SELECTED_POST_ID, selectedPostId };
  },
  setPostsDetails: (post: Post) => ({ type: SET_POST_DETAILS, post }),
  setLoadDetailsError: () => ({ type: SET_LOAD_DETAILS_ERROR }),
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

    case SET_SELECTED_POST_ID:
      return {
        ...state,
        selectedPostId: action.selectedPostId,
      };

    case SET_POST_DETAILS:
      return {
        ...state,
        postDetails: action.post,
      };

    case SET_LOAD_DETAILS_ERROR:
      return {
        ...state,
        loadDetailsError: true,
      };

    default:
      return state;
  }
};

export default postsReducer;
