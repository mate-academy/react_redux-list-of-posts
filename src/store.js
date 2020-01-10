import { createStore } from 'redux';

export const SET_POSTS = 'SET_POSTS';
export const SET_LOADING = 'SET_LOADING';
export const SET_LOADED = 'SET_LOADED';
export const SET_FILTER = 'SET_FILTER';
export const DELETE_POST = 'DELETE_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const setPostsAC = value => ({
  type: SET_POSTS, value,
});
export const setLoadingAC = value => ({
  type: SET_LOADING, value,
});
export const setLoadedAC = value => ({
  type: SET_LOADED, value,
});
export const setFilterAC = value => ({
  type: SET_FILTER, value,
});
export const deletePostAC = value => ({
  type: DELETE_POST, value,
});
export const deleteCommentAC = value => ({
  type: DELETE_COMMENT, value,
});

export const getPosts = state => state.posts;
export const getLoading = state => state.loading;
export const getLoaded = state => state.loaded;
export const getFilter = state => state.filter;

const initState = {
  posts: [],
  loading: false,
  loaded: false,
  filter: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.value,
      };
    case SET_FILTER:
      return {
        ...state,
        filter: action.value,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.value,
      };
    case SET_LOADED:
      return {
        ...state,
        loaded: action.value,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: [...state.posts]
          .filter(post => post.id !== action.value),
      };
    case DELETE_COMMENT:
      return {
        ...state,
        posts: [...state.posts].map(post => ({
          ...post,
          comments: post.comments
            .filter(comment => comment.id !== action.value),
        })),
      };
    default:
      return state;
  }
};

const store = createStore(reducer, initState);

export default store;
