import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import getDataFromServer from '../getDataApi';

import postsReducer, { setPosts } from './postsReducer';
import loadingReducer, { setLoading } from './loadingReducer';
import errorReducer, { setError } from './errorReducer';
import initializedReducer, { setInitialized } from './initializedReducer';
import queryReducer from './queryReducer';

const postsURL = 'https://jsonplaceholder.typicode.com/posts';
const usersURL = 'https://jsonplaceholder.typicode.com/users';
const commentsURL = 'https://jsonplaceholder.typicode.com/comments';

export const getPosts = state => state.posts
  .filter(post => (post.title + post.body).toLowerCase().includes(state.query));
export const getLoading = state => state.isLoading;
export const getError = state => state.hasError;
export const getInitialized = state => state.isInitialized;

const getPostsWithUsersAndComments = (allPosts, allUsers, allComments) => (
  allPosts.map(post => ({
    ...post,
    user: allUsers.find(user => user.id === post.userId),
    comments: allComments.filter(comment => comment.postId === post.id),
  }))
);

export const getPostsFromServer = () => async(dispatch) => {
  dispatch(setError(false));
  dispatch(setLoading(true));

  try {
    const [posts, users, comments] = await Promise.all([
      getDataFromServer(postsURL),
      getDataFromServer(usersURL),
      getDataFromServer(commentsURL),
    ]);

    dispatch(setPosts(
      getPostsWithUsersAndComments(posts, users, comments)
    ));
    dispatch(setInitialized(true));
  } catch {
    dispatch(setError(true));
  }

  dispatch(setLoading(false));
};

const rootReducer = combineReducers({
  posts: postsReducer,
  isLoading: loadingReducer,
  hasError: errorReducer,
  isInitialized: initializedReducer,
  query: queryReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
