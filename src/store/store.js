import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const START_LOADING = 'START_LOADING';
const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
const HANDLE_ERROR = 'HANDLE_ERROR';
const POST_DELETE = 'POST_DELETE';
const SEARCH_POST = 'SEARCH_POST';

export const createActionStartLoading = () => ({
  type: START_LOADING,
});

export const createActionHandleSuccess = combineData => ({
  type: HANDLE_SUCCESS,
  combineData,
});

export const createActionHandleError = () => ({
  type: HANDLE_ERROR,
});

export const createActionDeletePost = id => ({
  type: POST_DELETE,
  id,
});

export const createActionSearchQuery = (e) => {
  const { value } = e.target;

  return {
    type: SEARCH_POST,
    value,
  };
};

const initialState = {
  combineData: [],
  isLoading: false,
  hasError: false,
  originCopy: [],
};

export const createActionloadTodos = () => async(dispatch) => {
  dispatch(createActionStartLoading());

  const [
    postsFromServer,
    usersFromServer,
    commentsFromServer,

  ] = await Promise.all([
    axios.get('https://jsonplaceholder.typicode.com/posts'),
    axios.get('https://jsonplaceholder.typicode.com/users'),
    axios.get('https://jsonplaceholder.typicode.com/comments'),
  ]).catch(() => {
    dispatch(createActionHandleError());
  });

  const combineData = postsFromServer.data.map(post => ({
    ...post,
    user: usersFromServer.data.find(user => user.id === post.userId),
    comments: commentsFromServer.data
      .filter(comment => comment.postId === post.id),
  }));

  dispatch(createActionHandleSuccess(combineData));
};

export const getPosts = state => state.combineData;
export const getStatusLoading = state => state.isLoading;
export const getError = state => state.hasError;
export const getStatusIsInit = state => state.isInit;

const reducer = (state, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
        isInit: false,
      };
    case HANDLE_SUCCESS:
      return {
        ...state,
        combineData: action.combineData,
        originCopy: action.combineData,
        isLoading: false,
        isInit: true,
      };
    case HANDLE_ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    case POST_DELETE:
      return {
        ...state,
        combineData: state.combineData
          .filter(post => post.id !== action.id),
      };
    case SEARCH_POST:
      if (action.value === '') {
        return {
          ...state,
          combineData: state.originCopy,
        };
      }

      return {
        ...state,
        combineData: state.combineData
          .filter(post => post.title.toLowerCase().includes(action.value)
            || post.body.toLowerCase().includes(action.value)),
      };
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk),
);

export default store;
