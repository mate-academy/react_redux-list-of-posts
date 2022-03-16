import { PostsAction, PostsActionTypes, PostsState } from '../types/posts';

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
  searchQuery: '',
};

export const postsReducer = (state = initialState, action: PostsAction) => {
  switch (action.type) {
    case PostsActionTypes.FETCH_POSTS:
      return {
        ...state,
        loading: true,
      };

    case PostsActionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: [...action.payload],
      };

    case PostsActionTypes.FETCH_POSTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case PostsActionTypes.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };

    default:
      return state;
  }
};
