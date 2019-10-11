import ACTION_TYPES from './actionTypes';

export const initialState = {
  preparedPosts: [],
  isLoading: false,
  isLoaded: false,
  hasError: false,
};

export const reducer = (state = initialState, action) => {
  const posts = state.preparedPosts;
  const filterComments = (array, id) => (
    array.map(item => ({
      ...item,
      comments: item.comments
        .filter(comment => comment.id !== id),
    }))
  );

  switch (action.type) {
    case ACTION_TYPES.START_LOADING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case ACTION_TYPES.HANDLE_SUCCESS:
      return {
        ...state,
        preparedPosts: action.payload,
        isLoaded: true,
        isLoading: false,
      };
    case ACTION_TYPES.HANDLE_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: false,
      };
    case ACTION_TYPES.HANDLE_DELETE_POST:
      return {
        ...state,
        preparedPosts: state.preparedPosts
          .filter(post => post.id !== action.payload),
      };
    case ACTION_TYPES.HANDLE_DELETE_COMMENT:
      return {
        ...state,
        preparedPosts: filterComments(posts, action.payload),
      };

    default:
      return state;
  }
};
