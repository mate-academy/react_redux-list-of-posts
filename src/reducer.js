import { START_LOADING,
  HANDLE_SUCCESS,
  DELETE_POST,
  DELETE_COMMENT,
  LOADING } from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoaded: true,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case HANDLE_SUCCESS:
      return {
        ...state,
        posts: action.posts,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.id),
      };
    case DELETE_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post => (
          {
            ...post,
            comments: post.comments.filter(comment => comment.id !== action.id),
          })),
      };
    default:
      return state;
  }
};
