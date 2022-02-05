import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Post } from '../types/Post';
import { User } from '../types/User';

const LOAD_POSTS = 'LOAD_POSTS';
const LOAD_USERS = 'LOAD_USERS';
const SET_USER_ID = 'SET_USER_ID';
const SET_POST_ID = 'SET_POST_ID';
const LOAD_SELECTED_POST = 'LOAD_SELECTED_POST';

export type State = {
  posts: Post[],
  users: User[],
  selectedUserId: 0,
  selectedPostId: 0,
  selectedPost: Post,
};

const defaultState: State = {
  posts: [],
  users: [],
  selectedUserId: 0,
  selectedPostId: 0,
  selectedPost: {
    id: 0,
    userId: 0,
    title: '',
    body: '',
  },
};

const reducer = (state = defaultState, action: any): State => {
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: [...action.payLoad],
      };

    case LOAD_SELECTED_POST:
      return { ...state, selectedPost: { ...action.payLoad } };

    case LOAD_USERS:
      return {
        ...state,
        users: [...action.payLoad],
      };

    case SET_POST_ID:
      return { ...state, selectedPostId: action.payLoad };

    case SET_USER_ID:
      return { ...state, selectedUserId: action.payLoad };

    default:
      return { ...state };
  }
};

export const addPostsAction = (payLoad: Post[]) => ({ type: LOAD_POSTS, payLoad });
export const addUsersAction = (payLoad: User[]) => ({ type: LOAD_USERS, payLoad });
export const loadSelectedPostAction = (payLoad: Post) => ({ type: LOAD_SELECTED_POST, payLoad });
export const selectUserIdAction = (payLoad: number) => ({ type: SET_USER_ID, payLoad });
export const selectPostIdAction = (payLoad: number) => ({ type: SET_POST_ID, payLoad });

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
