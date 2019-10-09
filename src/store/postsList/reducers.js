import { ACTION_TYPES } from './actions';

const initialState = {
  isLoading: false,
  isDataLoaded: false,
  error: '',
  postsList: [],
};

function postsListReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPES.POSTS_LIST_FETCH_DATA_IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case ACTION_TYPES.POSTS_LIST_FETCH_DATA_SUCCESS:
      return {
        ...state,
        isLoading: true,
        isDataLoaded: true,
        postsList: action.payload,
      };

    case ACTION_TYPES.POSTS_LIST_FETCH_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case ACTION_TYPES.DELETE_POST:
      return {
        ...state,
        postsList: state.postsList.filter(post => post.id !== action.payload),
      };

    case ACTION_TYPES.DELETE_COMMENT:
      return {
        ...state,
        postsList: state.postsList.map(post => ({
          ...post,
          comments: post.comments.filter(comment => comment.id !== action.payload),
        })),
      };

    default:
      return state;
  }
}

export default postsListReducer;
