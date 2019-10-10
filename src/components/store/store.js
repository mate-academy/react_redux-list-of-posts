import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

function filteringByData(data, state) {
  return data.filter(item => (
    item.user.name.toLowerCase().includes(state.userRequest)));
}

function filteringByUsers(data, state) {
  return data.filter(user => (
    user.name.toLowerCase().includes(state.userRequest)));
}

function getMergedОbjects(comments, users, posts) {
  return posts.map(post => ({
    ...post,
    comments: comments.filter(comment => comment.postId === post.id),
    user: users.reduce((acc, user) => (
      { ...acc, [user.id]: user }), {})[post.userId],
  }));
}

const API_URL = 'https://jsonplaceholder.typicode.com';

const ACTION_TYPES = {
  ADD_DATA: 'ADD_DATA',
  LOAD_DATA: 'LOAD_DATA',
  FILTR_DATA: 'FILTR_DATA',
  USER_REQUEST: 'USER_REQUEST',
  USERS_LIST: 'USERS_LIST',
  RESET_SORT: 'RESET_SORT',
};

const userList = data => ({
  type: ACTION_TYPES.USERS_LIST,
  payload: data,
});

export const addData = data => ({
  type: ACTION_TYPES.ADD_DATA,
  payload: data,
});

export const sortData = data => ({
  type: ACTION_TYPES.FILTR_DATA,
  payload: data,
});

export const resetSort = data => ({
  type: ACTION_TYPES.RESET_SORT,
  payload: data,
});

export const valueToSort = data => ({
  type: ACTION_TYPES.USER_REQUEST,
  payload: data,
});

const acceptData = () => ({
  type: ACTION_TYPES.LOAD_DATA,
});

const initialState = {
  originalData: [],
  sortedData: [],
  users: [],
  usersNamesList: [],
  userRequest: '',
  isLoading: false,
};

export const getData = () => (dispatch) => {
  dispatch(acceptData());
  Promise.all([
    fetch(`${API_URL}/comments`),
    fetch(`${API_URL}/users`),
    fetch(`${API_URL}/posts`),
  ])
    .then(([comments, users, posts]) => Promise.all([
      comments.json(),
      users.json(),
      posts.json(),
    ]))
    .then(([comments, users, posts]) => (
      dispatch(addData(getMergedОbjects(comments, users, posts))),
      dispatch(userList(users)),
      dispatch(acceptData())
    ));
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.ADD_DATA: {
      return {
        ...state,
        originalData: action.payload,
        sortedData: action.payload,
      };
    }
    case ACTION_TYPES.LOAD_DATA: {
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    }
    case ACTION_TYPES.RESET_SORT: {
      return {
        ...state,
        sortedData: [...state.originalData],
        userRequest: '',
        usersNamesList: [...state.users],
      };
    }
    case ACTION_TYPES.FILTR_DATA: {
      return {
        ...state,
        sortedData: filteringByData([...state.originalData], state),
        usersNamesList: filteringByUsers([...state.users], state),
      };
    }
    case ACTION_TYPES.USER_REQUEST: {
      return {
        ...state,
        userRequest: action.payload,
      };
    }
    case ACTION_TYPES.USERS_LIST: {
      return {
        ...state,
        users: action.payload,
        usersNamesList: action.payload,
      };
    }
    default:
      return state;
  }
}

export const store = createStore(
  reducer,
  applyMiddleware(thunk),
);
