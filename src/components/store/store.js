import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const COMMENTS_API_URL = 'https://jsonplaceholder.typicode.com/comments';
const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users';
const POSTS_API_URL = 'https://jsonplaceholder.typicode.com/posts';

const ACTION_TYPES = {
  ADD_DATA: 'DATA::ADD',
  LOAD_DATA: 'LOAD::ADD',
  SORT_DATA: 'SORT::DATA',
  INPUT_NAME: 'NAME::ADD',
  USER_LIST: 'USER::LIST',
  RESET_SORT: 'SORT::RESET',
};

function fullData(comments, users, posts) {
  return posts.map(post => ({
    ...post,
    comments: comments.filter(comment => comment.postId === post.id),
    user: users.reduce((acc, user) => (
      { ...acc, [user.id]: user }), {})[post.userId],
  }));
}

const userList = data => ({
  type: ACTION_TYPES.USER_LIST,
  payload: data,
});

export const addData = data => ({
  type: ACTION_TYPES.ADD_DATA,
  payload: data,
});

export const sortData = data => ({
  type: ACTION_TYPES.SORT_DATA,
  payload: data,
});

export const resetSort = data => ({
  type: ACTION_TYPES.RESET_SORT,
  payload: data,
});

export const inputName = data => ({
  type: ACTION_TYPES.INPUT_NAME,
  payload: data,
});

const loadData = data => ({
  type: ACTION_TYPES.LOAD_DATA,
  payload: data,
});

const initialState = {
  originalData: [],
  sortedData: [],
  users: [],
  usersToDisplay: [],
  inputtedName: '',
  isLoading: false,
};

export const getData = () => (dispatch) => {
  store.dispatch(loadData());
  Promise.all([
    fetch(COMMENTS_API_URL),
    fetch(USERS_API_URL),
    fetch(POSTS_API_URL),
  ])
    .then(([res1, res2, res3]) => Promise.all([
      res1.json(),
      res2.json(),
      res3.json(),
    ]))
    .then(([comments, users, posts]) => store.dispatch(addData(fullData(comments, users, posts)),
      store.dispatch(userList(users)),
      store.dispatch(loadData())));
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
        inputtedName: '',
        usersToDisplay: [...state.users],
      };
    }
    case ACTION_TYPES.SORT_DATA: {
      return {
        ...state,
        sortedData: [...state.originalData].filter(data => (
          data.user.name.toLowerCase().includes(state.inputtedName))),
        usersToDisplay: [...state.users].filter(data => (
          data.name.toLowerCase().includes(state.inputtedName))),
      };
    }
    case ACTION_TYPES.INPUT_NAME: {
      return {
        ...state,
        inputtedName: action.payload,
      };
    }
    case ACTION_TYPES.USER_LIST: {
      return {
        ...state,
        users: action.payload,
        usersToDisplay: action.payload,
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
