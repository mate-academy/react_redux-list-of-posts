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
      const clonedPosts = [...state.data];
      const clonedSearchedPosts = state.search ? [...state.searchedPosts] : null;
      console.log(clonedPosts, clonedSearchedPosts);
      return {
        ...state,
        data: clonedPosts.filter(post => post.id !== action.id),
        searchedPosts: state.search
                       ? clonedSearchedPosts.filter(post => post.id !== action.id)
                       : state.searchedPosts
      }
    case REMOVE_COMMENT:
      const clonedComments = [...state.comments];
      return {
        ...state,
        comments: clonedComments.filter(comment => comment.id !== action.id)
      }
    case SEARCH_POSTS:
      const clonedData = [...state.data];
      const serchText = action.inputValue.trim();
      const searchedPosts = clonedData.filter(post => {
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
