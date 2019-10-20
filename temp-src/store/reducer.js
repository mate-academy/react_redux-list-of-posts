import { ACTION_TYPES } from './actions';

const {
  LOAD,
  HANDLE_SUCCESS,
  HANDLE_ERROR,
  // HANDLE_REMOVE,
  // HANDLE_REMOVE2,
  // HANDLE_SORT,
} = ACTION_TYPES;

export const initialState = {
  disabled: false,
  isLoading: false,
  hasError: false,
  // titleFiltering: 0,
  // userFiltering: 0,
  posts: [],
  users: [],
  comments: [],
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };

    case HANDLE_SUCCESS:
      return {
        ...state,
        posts: action.paload.posts,
        users: action.paload.users,
        comments: action.paload.comments,
        isLoading: false,
        hasError: false,
        disabled: true,
      };

    case HANDLE_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };

      // case HANDLE_REMOVE:
      //   return {
      //     ...state,
      //     todosWithUsers: [...state.todosWithUsers]
      //       .filter(todo => todo.id !== action.payload),
      //   };

      // case HANDLE_SORT:
      //   switch (action.payload) {
      //     case 'By user':
      //       return {
      //         ...state,
      //         todosWithUsers: [...state.todosWithUsers]
      //           .sort((a, b) => a.user.username.
      //              localeCompare(b.user.username)),
      //       };

      //     case 'By title':
      //       return {
      //         ...state,
      //         todosWithUsers: [...state.todosWithUsers]
      //           .sort((a, b) => a.title.localeCompare(b.title)),
      //       };

      //     case 'By status':
      //       return {
      //         ...state,
      //         todosWithUsers: [...state.todosWithUsers]
      //           .sort((a, b) => a.completed - b.completed),
      //       };

      //     default:
      //       return state;
      //   }

    default:
      return state;
  }
};
