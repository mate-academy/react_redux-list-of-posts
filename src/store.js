import { createStore } from 'redux';

// Action Types
const ACTION_TYPE_SET_POSTS = 'SET_POSTS';
const ACTION_TYPE_DELETE_POST = 'DELETE_POST';
const ACTION_TYPE_DELETE_COMMENT = 'DELETE_COMMENT';
const ACTION_TYPE_SET_QUERY_SELECTOR = 'SET_QUERY_SELECTOR';

const ACTION_TYPE_START_LOADING = 'START_LOADING';
const ACTION_TYPE_FINISH_LOADING = 'FINISH_LOADING';
const ACTION_TYPE_LOADING_BUTTON_IS_OFF = 'LOADING_BUTTON_IS_OFF';

// Action Creators
export const setPosts = posts => ({
  type: ACTION_TYPE_SET_POSTS,
  posts,
});

export const deletePost = postId => ({
  type: ACTION_TYPE_DELETE_POST,
  postId,
});

export const deleteComment = (commentId, postId) => ({
  type: ACTION_TYPE_DELETE_COMMENT,
  commentId,
  postId,
});

export const setQuerySelector = inputValue => ({
  type: ACTION_TYPE_SET_QUERY_SELECTOR,
  inputValue,
});

export const startLoading = () => ({
  type: ACTION_TYPE_START_LOADING,
});

export const finishLoading = () => ({
  type: ACTION_TYPE_FINISH_LOADING,
});

export const hideLoadingButton = () => ({
  type: ACTION_TYPE_LOADING_BUTTON_IS_OFF,
});

// Selectors
export const getPosts = state => state.posts
  .filter(post => (post.title + post.body).includes(state.querySelector));

// Reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE_SET_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    case ACTION_TYPE_SET_QUERY_SELECTOR:
      return {
        ...state,
        querySelector: action.inputValue,
      };
    case ACTION_TYPE_DELETE_POST:
      return {
        ...state,
        posts: state.posts
          .filter(post => post.id !== action.postId),
      };
    case ACTION_TYPE_DELETE_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === action.postId) {
            post.comments = post.comments
              .filter(c => c.id !== action.commentId);
          }

          return {
            ...post,
            comments: post.comments,
          };
        }),
      };
    case ACTION_TYPE_START_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ACTION_TYPE_FINISH_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case ACTION_TYPE_LOADING_BUTTON_IS_OFF:
      return {
        ...state,
        loadingButton: false,
      };
    default:
      return state;
  }
};

const initialState = {
  posts: [],
  isLoading: false,
  loadingButton: true,
  querySelector: '',
};

const store = createStore(rootReducer, initialState);

export default store;
