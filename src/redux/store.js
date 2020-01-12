import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loadReducer from './loadPeducer';
import postListReducer from './postListReducer';
import errorLoadDataReducer from './errorLoadDataReducer';
import searchingPostsReducer from './searchingPostsReducer';
import isSearchingPostsReducer from './isSearchingPostsReducer';
import { getUsersResolvedPromise } from '../api/usersApi';
import { getPostsResolvedPromise } from '../api/postsApi';
import { getCommentsResolvedPromise } from '../api/commentsApi';
import { getPostsWithUsersAndComments } from '../helpers/getPostsWithUsersAndComments';
import {
  startLoading,
  handleSuccess,
  handleSearch,
  handleError,
} from './actions';

// selectors
export const getPosts = state => state.posts;
export const getIsSearchingPosts = state => state.isSearching;
export const getSearchingPosts = state => state.searchingPosts;
export const getLoading = state => state.isLoading;
export const getError = state => state.hasError;

export const loadData = () => {
  return async(dispatch) => {
    dispatch(startLoading())

    try {
      const [
        postsArr,
        usersArr,
        commentsArr,
      ] = await Promise.all([
        await getPostsResolvedPromise(),
        await getUsersResolvedPromise(),
        await getCommentsResolvedPromise(),
      ]);
      dispatch(handleSuccess(getPostsWithUsersAndComments(postsArr, usersArr, commentsArr)));
      dispatch(handleSearch(getPostsWithUsersAndComments(postsArr, usersArr, commentsArr)));
    } catch (e) {
      dispatch(handleError())
    }
  }
}

const rootReducer = combineReducers({
  isLoading: loadReducer,
  posts: postListReducer,
  hasError: errorLoadDataReducer,
  searchingPosts: searchingPostsReducer,
  isSearching: isSearchingPostsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
