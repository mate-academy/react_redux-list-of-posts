import ACTION_TYPES from './actionTypes';

export const initialState = {
  users: [],
  posts: [],
  comments: [],
  isLoading: false,
  isLoaded: false,
  hasError: false,
};

export const reducer = (state = initialState, action) => {
  const filterComments = (array, id) => (
    array.filter(comment => comment.id !== id)
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
        users: action.payload.users,
        posts: action.payload.posts,
        comments: action.payload.comments,
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
        posts: [...state.posts]
          .filter(post => post.id !== action.payload),
      };
    case ACTION_TYPES.HANDLE_DELETE_COMMENT:
      return {
        ...state,
        comments: filterComments(state.comments, action.payload),
      };

    default:
      return state;
  }
};
