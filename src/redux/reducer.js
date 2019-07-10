import { DISPLAY, LOAD_DATA, REMOVE_POST, FIND_POST, REMOVE_COMMENT} from "./action";

const initialState = {
  listPosts: null,
  searchedPosts: null,
  commentList: null,
  requested: false,
  search: false
};

export default function postApp(state = initialState, action) {
  switch(action.type) {
    case LOAD_DATA:
      return {
        ...state,
        requested: true
      }
    case FIND_POST:
      const searchText = action.value.trim();
      const searchedPost = state.listPosts.filter(post => {
        return post.title.includes(searchText) || post.body.includes(searchText);
       });
      return {
        ...state,
        search: true,
        searchedPosts: searchedPost
      }
    case DISPLAY:
      const [posts, users, comments] = action.data
      return {
        ...state,
        listPosts: posts.map(post => {
          return {
            ...post,
            user: users.find(user => user.id === post.userId)
          };
        }),
        commentList: [...comments]
      };
    case REMOVE_POST:
      return {
        ...state,
        listPosts: state.listPosts.filter(post => post.id !== action.id)
      }
    case REMOVE_COMMENT: 
      return {
        ...state,
        commentList: state.commentList.filter(comment => comment.id !== action.id)
      }
    default:
      return state;
  };
}