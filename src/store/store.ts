import { createStore, applyMiddleware } from 'redux';
import {Dispatch} from 'react';
import thunk from 'redux-thunk';

import { actionType } from './actionType';
import {
  ActionCreatorsTypes,
  isLoadedCreator,
  isLoadingCreator,
  loadComments,
  loadPosts,
  loadUsers
} from './actionCreators';
import {getData} from '../api/api';

export const SORT_TYPES = {
  name: 'name',
  completed: 'completed',
  title: 'title',
};

const initialState = {
  isLoading: false,
  isLoaded: false,
  users: [],
  posts: [],
  comments: [],
  filteredPosts: [],
  sortField: SORT_TYPES.name,
};


export const loadData = () => {
  return async (dispatch: Dispatch<ActionCreatorsTypes>) => {
    dispatch(isLoadingCreator());

    await Promise.all([
      getData('posts'),
      getData('users'),
      getData('comments'),
    ]).then(([posts, users, comments]) => {
      dispatch(loadPosts(posts));
      dispatch(loadUsers(users));
      dispatch(loadComments(comments));
    });

    dispatch(isLoadedCreator());
  };
};


const reducer = (state: InitialStateInterface = initialState, action: any) => { // ActionCreatorsTypes
  switch (action.type) {
    case actionType.IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
      break;

    case actionType.IS_LOADED:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
      };
      break;

    case actionType.LOAD_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
      break;

    case actionType.LOAD_USERS:
      return {
        ...state,
        users: action.users,
      };
      break;

    case actionType.LOAD_COMMENTS:
      return {
        ...state,
        comments: action.comments,
      };
      break;

    default:
      return state;

  }
};

export const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk),
);
