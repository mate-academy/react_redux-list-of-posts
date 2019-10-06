import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import getData from '../utils/api';
import getPostsWithUsers from '../utils/getPostsWithUsers';
import getPostWithComments from '../utils/getPostWithComments';

const initialState = {
  postListFromServer: [],
  postList: [],
  filteredList: [],
  isLoading: false,
  isLoaded: false,
  isError: false,
  buttonText: 'Load',
};

export const START_LOADING = 'START_LOADING';
export const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
export const HANDLE_ERROR = 'HANDLE_ERROR';

const startLoading = () => ({ type: START_LOADING });

const handleSuccess = postsWithUsers => ({
  type: HANDLE_SUCCESS,
  postsWithUsers,
});

const handleError = () => ({ type: HANDLE_ERROR });

export const loadData = () => (dispatch) => {
  dispatch(startLoading());
  Promise.all([
    getData('comments'),
    getData('posts'),
    getData('users'),
  ])
    .then(([comments, posts, users]) => {
      const postsWithComments = getPostWithComments(
        getPostsWithUsers(posts, users), comments
      );
      dispatch(handleSuccess(postsWithComments));
    })
    .catch(() => dispatch(handleError()));
};

const reducer = (state, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        buttonText: 'loading...',
        isLoading: true,
      };

    case HANDLE_SUCCESS:
      return {
        ...state,
        postListFromServer: action.postsWithComments,
        postList: action.postsWithComments,
        filteredList: action.postsWithComments,
        isLoaded: true,
        isLoading: false,
        isError: false,
      };

    case HANDLE_ERROR:
      return {
        ...state,
        buttonText: 'try again',
        isLoaded: false,
        isLoading: false,
        isError: true,
      };

    default: return state;
  }
};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk),
);

export default store;
