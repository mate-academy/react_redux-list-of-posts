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
      return { ...state, posts: [...action.value] };

    case LOAD_SELECTED_POST:
      return { ...state, selectedPost: { ...action.value } };

    case LOAD_USERS:
      return { ...state, users: [...action.value] };

    case SET_POST_ID:
      return { ...state, selectedPostId: action.value };

    case SET_USER_ID:
      return { ...state, selectedUserId: action.value };

    default:
      return { ...state };
  }
};

export const addPostsAction = (value: Post[]) => ({ type: LOAD_POSTS, value });
export const addUsersAction = (value: User[]) => ({ type: LOAD_USERS, value });
export const loadSelectedPostAction = (value: Post) => ({ type: LOAD_SELECTED_POST, value });
export const selectUserIdAction = (value: number) => ({ type: SET_USER_ID, value });
export const selectPostIdAction = (value: number) => ({ type: SET_POST_ID, value });

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
