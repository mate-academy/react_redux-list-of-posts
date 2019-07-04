import {POSTS_LOAD, USERS_LOAD, COMMENTS_LOAD,
  POSTS_RECEIVED, USERS_RECEIVED, COMMENTS_RECEIVED, REMOVE_POST } from './actions';

const initialState = {
  postList: null,
  userList: null,
  commentList: null,

  postLoading: false,
  userLoading: false,
  commentLoading: false
};

export function getNextState(state = initialState, action) {
  switch (action.type) {
    case POSTS_LOAD:
      return {
        ...state,
        postList: null,
        postLoading: true
      };
    case USERS_LOAD:
      return {
        ...state,
        userList: null,
        userLoading: true
      };
    case COMMENTS_LOAD:
      return {
        ...state,
        commentList: null,
        commentLoading: true
      };
    case POSTS_RECEIVED:
      return {
        ...state,
        postLoading: false,
        postList: action.payload
      };
    case USERS_RECEIVED:
      return {
        ...state,
        userLoading: false,
        userList: action.payload
      };
    case COMMENTS_RECEIVED:
      return {
        ...state,
        commentLoading: false,
        commentList: action.payload
      };
    case REMOVE_POST:
      return {
        ...state,
        postList: state.postList.filter(post => post.id !== action.removePostId)
      };
    default:
      return state;
  }
}
