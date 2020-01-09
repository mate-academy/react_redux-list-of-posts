import { createStore } from 'redux';

const initialState = {
  postsFromServer: [],
  posts: [],
  isLoading: false,
  isSearchError: false,
};

export const selectPosts = state => state.posts;
export const selectLoading = state => state.isLoading;
export const selectSearchError = state => state.isSearchError;

const ACTION_TYPES = {
  SET_POSTS: 'setPosts',
  DELETE_POST: 'deletePost',
  DELETE_COMMENT: 'deleteComment',
  SET_LOADING: 'setLoading',
  FILTER_POSTS: 'filterPosts',
};

export const createActionSetPosts = payload => ({
  type: ACTION_TYPES.SET_POSTS,
  payload,
});

export const createActionDeletePost = payload => ({
  type: ACTION_TYPES.DELETE_POST,
  payload,
});

export const createActionDeleteComment = (postId, commentId) => ({
  type: ACTION_TYPES.DELETE_COMMENT,
  postId,
  commentId,
});

export const createActionSetLoading = payload => ({
  type: ACTION_TYPES.SET_LOADING,
  payload,
});

export const createActionFilterPosts = payload => ({
  type: ACTION_TYPES.FILTER_POSTS,
  payload,
});

const rootReducer = (state, action) => {
  let newPosts;

  switch (action.type) {
    case ACTION_TYPES.SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        postsFromServer: action.payload,
      };

    case ACTION_TYPES.DELETE_POST:
      newPosts = state.posts.filter(post => post.id !== action.payload);

      return {
        ...state,
        posts: newPosts,
        postsFromServer: newPosts,
      };

    case ACTION_TYPES.DELETE_COMMENT:
      newPosts = (state.posts.map(post => post.id === action.postId
        ? {
          ...post,
          comments: post.comments.filter(comment => comment.id !== action.commentId),
        }
        : post));

      return {
        ...state,
        posts: newPosts,
        postsFromServer: newPosts,
      };

    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case ACTION_TYPES.FILTER_POSTS:
      const visiblePosts = state.postsFromServer
        .filter(post => post.title.toLowerCase().includes(action.payload)
          || post.body.toLowerCase().includes(action.payload));

      return visiblePosts.length === 0
        ? {
          ...state,
          isSearchError: true,
        }
        : {
          ...state,
          posts: visiblePosts,
          isSearchError: false,
        };

    default:
      return state;
  }
};

export default createStore(rootReducer, initialState);
