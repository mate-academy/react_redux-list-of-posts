import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import postsReducer, { setPosts } from './reducers/postsReducer';
import queryReducer from './reducers/queryReducer';
import { loadUsersFromServer } from './api/getUsers';
import { loadPostsFromServer } from './api/getPosts';
import { loadCommentsFromServer } from './api/getComments';
import loadingReducer, {
  startLoading,
  finishLoading,
} from './reducers/loadingReducer';

export const loadFromServer = () => async(dispatch) => {
  dispatch(startLoading());

  const [
    postsFromServer,
    commentsFromServer,
    usersFromServer,
  ] = await Promise.all([
    loadPostsFromServer(),
    loadCommentsFromServer(),
    loadUsersFromServer(),
  ]);

  const preparedPosts = postsFromServer.map(post => ({
    ...post,
    user: usersFromServer.find(person => post.userId === person.id),
    comments: commentsFromServer.filter(comment => comment.postId === post.id),
  }));

  dispatch(setPosts(preparedPosts));
  dispatch(finishLoading());
};

export const getPosts = state => state.posts;
export const getIsLoading = state => state.isLoading;
export const getQuery = state => state.query;

const rootReducer = combineReducers({
  posts: postsReducer,
  isLoading: loadingReducer,
  query: queryReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
