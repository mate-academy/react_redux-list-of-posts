import { LOAD_DATA,
         FILL_DATA,
         REMOVE_POST,
         REMOVE_COMMENT,
         SEARCH_POSTS } from "./actions";

const initialState = {
  requested: false,
  data: null,
  comments: null,
  search: false,
  searchedPosts: null
};

export function getNextState(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA:
      return {
        ...state,
        requested: true
      };
    case FILL_DATA:
      return {
        ...state,
        data: action.data,
        comments: action.commentsData
      }
    case REMOVE_POST:
      const searched = state.search ? state.searchedPosts : null;
      return {
        ...state,
        data: state.data.filter(post => post.id !== action.id),
        searchedPosts: state.search
                       ? searched.filter(post => post.id !== action.id)
                       : state.searchedPosts
      }
    case REMOVE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.id)
      }
    case SEARCH_POSTS:
      const serchText = action.inputValue.trim();
      const searchedPosts = state.data.filter(post => {
        return post.title.includes(serchText) || post.body.includes(serchText);
      });

      return {
        ...state,
        search: true,
        searchedPosts: searchedPosts
      }
    default:
      return state;
  }
}
