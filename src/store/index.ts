import { createStore, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
// import { Dispatch } from 'react';
import { PreparedPosts } from '../helpers/types';

const START_LOADING = 'START_LOADING';
const FINISH_LOADING = 'FINISH_LOADING';
const SET_SEARCH = 'SET_SEARCH';
const DELETE_COMMENT = 'DELETE_COMMENT';
const DELETE_POST = 'DELETE_POST';

// Action creators
export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = (value: PreparedPosts[]) => ({ type: FINISH_LOADING, value });
export const setSearch = (query: string) => ({ type: SET_SEARCH, query });
export const deleteComment = (id: number, commentId: number) => (
  { type: DELETE_COMMENT, id, commentId }
);
export const deletePost = (postId: number) => ({ type: DELETE_POST, postId });

// Selectors
export const isLoading = (state: RootState) => state.loading;
export const isLoaded = (state: RootState): boolean => state.loaded;
export const getPosts = (state: RootState) => state.posts;
export const getFilteredPosts = (state: RootState) => (
  [...state.posts].filter(post => (
    post.title.toLowerCase().includes(state.query.toLowerCase())
      || post.body.toLowerCase().includes(state.query.toLowerCase()))));

const initialState = {
  loading: false,
  posts: [],
  loaded: false,
  query: '',
};

// Initial state
export type RootState = {
  loading: boolean;
  posts: PreparedPosts[];
  loaded: boolean;
  query: string;
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };

    case FINISH_LOADING:
      return {
        ...state,
        posts: action.value,
        loaded: true,
        loading: false,
      };

    case SET_SEARCH:
      return {
        ...state,
        query: action.query,
      };

    case DELETE_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post: PreparedPosts) => ((post.id === action.id)
          ? {
            ...post,
            commentList: post.commentList.filter(comment => comment.id !== action.commentId),
          } : post)),
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post: PreparedPosts) => post.id !== action.postId),
      };

    default:
      return state;
  }
};

const store = createStore(
  reducer,
  composeWithDevTools(),
);

export default store;
