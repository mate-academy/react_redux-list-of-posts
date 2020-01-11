import { createStore } from 'redux';

// Action Types
const ACTION_TYPE_SET_POSTS = 'SET_POSTS';
const ACTION_TYPE_SET_VISIBLE_POSTS = 'SET_VISIBLE_POSTS';
const ACTION_TYPE_DELETE_POST = 'DELETE_POST';
const ACTION_TYPE_DELETE_COMMENT = 'DELETE_COMMENT';

const ACTION_TYPE_START_LOADING = 'START_LOADING';
const ACTION_TYPE_FINISH_LOADING = 'FINISH_LOADING';
const ACTION_TYPE_LOADING_BUTTON_IS_OFF = 'LOADING_BUTTON_IS_OFF';

// Action Creators
export const setPosts = allPosts => ({
  type: ACTION_TYPE_SET_POSTS,
  allPosts,
});

export const setVisiblePosts = visiblePosts => ({
  type: ACTION_TYPE_SET_VISIBLE_POSTS,
  visiblePosts,
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

export const startLoading = () => ({
  type: ACTION_TYPE_START_LOADING,
});

export const finishLoading = () => ({
  type: ACTION_TYPE_FINISH_LOADING,
});

export const hideLoadingButton = () => ({
  type: ACTION_TYPE_LOADING_BUTTON_IS_OFF,
});

// Reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE_SET_POSTS:
      return {
        ...state,
        allPosts: action.allPosts,
      };
    case ACTION_TYPE_SET_VISIBLE_POSTS:
      return {
        ...state,
        visiblePosts: action.visiblePosts,
      };
    case ACTION_TYPE_DELETE_POST:
      return {
        ...state,
        visiblePosts: state.visiblePosts
          .filter(post => post.id !== action.postId),
        allPosts: state.allPosts
          .filter(post => post.id !== action.postId),
      };
    case ACTION_TYPE_DELETE_COMMENT:
      return {
        ...state,
        visiblePosts: state.visiblePosts.map((post) => {
          if (post.id === action.postId) {
            post.comments = post.comments
              .filter(c => c.id !== action.commentId);
          }

          return {
            ...post,
            comments: post.comments,
          };
        }),
        allPosts: state.allPosts.map((post) => {
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
  allPosts: [],
  visiblePosts: [],
  isLoading: false,
  loadingButton: true,
};

const store = createStore(rootReducer, initialState);

export default store;
