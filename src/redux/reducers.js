import {LOAD, POSTS_RECEIVED, USERS_RECEIVED, COMMENTS_RECEIVED,
  CHECK_DATA, REMOVE_POST, mapData } from "./actions";

const initialState = {
  posts: null,
  users: null,
  comments: null,
  postList: null,
  requested: false
};

export function getNextState(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        requested: true
      };
    case POSTS_RECEIVED:
      return {
        ...state,
        posts: action.posts
      };
    case USERS_RECEIVED:
      return {
        ...state,
        users: action.users
      };
    case COMMENTS_RECEIVED:
      return {
        ...state,
        comments: action.comments
      };
    case CHECK_DATA:
      const postList = mapData(state);
      if (postList) {
        return {
          ...state,
          postList,
          requested: false
        }
      }
      return state;
    case REMOVE_POST:
      return {
        ...state,
        postList: state.postList.filter(post => post.id !== action.removePostId)
      };
    default:
      return state;
  }
}
