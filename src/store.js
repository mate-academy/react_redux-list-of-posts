import {createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

//constants

const GET_ISLOADING = 'GET_ISLOADING';
const SET_POSTS = 'SET_POSTS';
const SET_FILTERED_POSTS = 'SET_FILTERED_POSTS';
const SET_COMMENT_LIST = 'SET_COMMENT_LIST';
const DELETE_COMMENT = 'DELETE_COMMENT';
const DELETE_POST = 'DELETE_POST';

const initialState = {
  loadedPosts: [],
  postTemplate: [],
  isLoaded: false,
  isLoading: false,
  commentListIsOpen: false,
};

// action creators

export const getLoading = () => ({ type: GET_ISLOADING });
export const setPosts = (value) => ({ type: SET_POSTS, value });
export const setFilteredPosts = (value) => ({ type: SET_FILTERED_POSTS, value })
export const setCommentList = () => ({ type: SET_COMMENT_LIST })
export const deleteComment = (postId, commentId) => ({ type: DELETE_COMMENT, postId, commentId })
export const deletePost = (value) => ({ type: DELETE_POST, value })


// reducer

const reducer = (state, action) => {
  switch (action.type) {
    case GET_ISLOADING:
      return {
         ...state,
        isLoading: true,
      };

    case SET_POSTS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        loadedPosts: action.value,
        postTemplate: action.value,
      };

    case SET_FILTERED_POSTS:
      return {
        ...state,
        loadedPosts: [...state.postTemplate].filter((post) => {
          return (post.title && post.body).toLowerCase()
            .includes(action.value
              .toLowerCase()
              .trim());
            })
      };

    case SET_COMMENT_LIST:
      return {
        ...state,
        commentListIsOpen: !state.commentListIsOpen,
      };

    case DELETE_COMMENT:

       state.loadedPosts[action.postId-1].userComments = state.loadedPosts[action.postId-1].userComments.filter(
       comment => comment.id !== action.commentId)

      return  {
        ...state,
        loadedPosts: [...state.loadedPosts]
      };

    case DELETE_POST:
      return {
        ...state,
        loadedPosts: [...state.loadedPosts].filter(post => post.id !== action.value)
      }

    default:
      return state;
  }
};

// selectors

export const getLoadedPosts = state => state.loadedPosts;
export const getPostTemplate = state => state.postTemplate;
export const getIsLoaded = state => state.isLoaded;
export const getIsLoading = state => state.isLoading;
export const getCommentLists = state => state.commentListIsOpen;
export const commentData = state => state.loadedPosts;

// store

const store = createStore(reducer, initialState, composeWithDevTools());

export default store;
