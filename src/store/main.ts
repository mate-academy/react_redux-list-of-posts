import { AnyAction } from 'redux';
import { MainState, State } from './storeTypes';

const LOAD_POSTS = 'LOAD_POSTS';
const SELECT_POST = 'SELECT_POST';
const DELETE_POST = 'DELETE_POST';
const LOAD_COMMENTS = 'LOAD_COMMENTS';
const LOAD_ONEPOST = 'LOAD_ONEPOST';
const ADD_COMMENT = 'ADD_COMMENT';
const REMOVE_COMMENT = 'REMOVE_COMMENT';

export const actions = {
  loadPosts: (posts: Post[]) => ({ type: LOAD_POSTS, posts }),
  selectPost: (postId: number | null) => ({ type: SELECT_POST, postId }),
  loadComments: (comments: Commentary[]) => ({ type: LOAD_COMMENTS, comments }),
  loadOnePost: (post: Post) => ({ type: LOAD_ONEPOST, post }),
  addComment: (newComment: Commentary) => ({ type: ADD_COMMENT, newComment }),
  removeComment: (commentId: number) => ({ type: REMOVE_COMMENT, commentId }),
  deletePost: (postId: number) => ({ type: DELETE_POST, postId }),
};

export const selectors = {
  getPostsSelector: (state: State) => state.mainState.posts,
  getPostIdSelector: (state: State) => state.mainState.postId,
  getCommentsSelector: (state: State) => state.mainState.comments,
  getSelectedPost: (state: State) => state.mainState.selectedPost,
};

const mainInitialState: MainState = {
  posts: [],
  postId: null,
  comments: [],
  selectedPost: null,
};

const mainReducer = (mainState = mainInitialState, action: AnyAction) => {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...mainState,
        posts: action.posts,
      };

    case SELECT_POST:
      return {
        ...mainState,
        postId: action.postId,
      };

    case DELETE_POST:
      return {
        ...mainState,
        posts: mainState.posts.filter(post => post.id !== action.postId),
      };

    case LOAD_COMMENTS:
      return {
        ...mainState,
        comments: action.comments,
      };

    case LOAD_ONEPOST:
      return {
        ...mainState,
        selectedPost: action.post,
      };

    case ADD_COMMENT:
      return {
        ...mainState,
        comments: [...mainState.comments, action.newComment],
      };

    case REMOVE_COMMENT:
      return {
        ...mainState,
        comments: mainState.comments.filter(el => el.id !== action.commentId),
      };

    default:
      return mainState;
  }
};

export default mainReducer;
