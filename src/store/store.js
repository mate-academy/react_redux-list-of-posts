import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import getData from '../utils/api';
import getPostsWithUsers from '../utils/getPostsWithUsers';
import getPostWithComments from '../utils/getPostWithComments';
import {
  initialState,
  START_LOADING,
  HANDLE_SUCCESS,
  HANDLE_ERROR,
  FILTER_LIST,
  DELETE_COMMENT,
  DELETE_POST,
  RESET_LIST,
} from './constants';

const startLoading = () => ({ type: START_LOADING });

const handleSuccess = postsWithComments => ({
  type: HANDLE_SUCCESS,
  postsWithComments,
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

export const filterListOfPosts = searchStr => ({
  type: FILTER_LIST,
  searchStr,
});

export const deleteComment = (postId, commentId) => ({
  type: DELETE_COMMENT,
  postId,
  commentId,
});

export const deletePost = postId => ({
  type: DELETE_POST,
  postId,
});

export const resetListOfPosts = () => ({
  type: RESET_LIST,
});

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk),
);

export default store;
