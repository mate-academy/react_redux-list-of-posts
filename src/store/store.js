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

const START_LOADING = 'START_LOADING';
const HANDLE_SUCCESS = 'HANDLE_SUCCESS';
const HANDLE_ERROR = 'HANDLE_ERROR';
const FILTER_LIST = 'FILTER_LIST';

const startLoading = () => ({ type: START_LOADING });

const handleSuccess = postsWithComments => ({
  type: HANDLE_SUCCESS,
  postsWithComments,
});

const handleError = () => ({ type: HANDLE_ERROR });

export const filterListOfPosts = searchStr => ({
  type: FILTER_LIST,
  searchStr,
});

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

    case FILTER_LIST:
      return {
        ...state,
        filteredList: action.searchStr
          ? state.postList
            .filter(post => (
              (post.title.indexOf(action.searchStr) >= 0)
            || (post.body.indexOf(action.searchStr) >= 0)
            ))
          : [...state.postList],
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
