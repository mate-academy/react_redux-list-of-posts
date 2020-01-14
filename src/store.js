import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { getPosts, getUsers, getComments } from './api/getDataApi';
import initializedReducer, { setInitialized } from './reducers/inizializedReducer';
import postsReducer, { setPosts } from './reducers/postsReducer';
import loadingReducer, { setLoading } from './reducers/loadingReducer';
import errorReducer, { setError } from './reducers/ErrorReducer';
import queryReducer from './reducers/queryReducer';

export const getLoading = state => state.isLoading;
export const getError = state => state.hasError;
export const getInitialized = state => state.isInitialized;

export const getSearchPosts = state => state.posts
  .filter(post => (post.title + post.body).toLowerCase().includes(state.query));

const getPostsWithUsersAndComments = (
  listOfPosts, listOfUsers, listOfComments
) => (
  listOfPosts.map(post => ({
    ...post,
    user: listOfUsers.find(user => user.id === post.userId),
    comments: listOfComments.filter(comment => comment.postId === post.id),
  }))
);

export const getPostsFromServer = () => async(dispatch) => {
  dispatch(setError(false));
  dispatch(setLoading(true));

  try {
    const [posts, users, comments] = await Promise.all([
      getPosts(),
      getUsers(),
      getComments(),
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

export const store = createStore(rootReducer, applyMiddleware(thunk));
