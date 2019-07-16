import { LOAD, DISPLAY, REMOVE_POST, REMOVE_COMMENT, SEARCH_POST } from './actions';

const initialState = {
  requested: false,
  data: null,
  search: false,
  filtredPosts: null,
};

export default function getNextState(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        requested: true,
      };
    case DISPLAY:
      return {
        ...state,
        data: action.data,
      };
    case REMOVE_POST:
      if (!state.search) {
        return {
          ...state,
          data: action.data,
        };
      } else {
        return {
          ...state,
          filtredPosts: action.data,
        };
      }

    case REMOVE_COMMENT:
      return {
        ...state,
        data: action.data,
      };
    case SEARCH_POST:
      const searchText = action.value.trim();
      const searchBool = searchText !== '' ? true : false;
      const posts = state.data.filter((post) => {
          return post.title.includes(searchText) || post.body.includes(searchText);
        });
        if (searchBool) {
          return {
            ...state,
            filtredPosts: posts,
            search: searchBool,
        }
        } else {
          return {
            ...state,
            search: searchBool,
            filtredPosts: null,
          }
      };
    default:
      return state;
  }
}
