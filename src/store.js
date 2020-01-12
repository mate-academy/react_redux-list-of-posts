import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  getPostsFromServer, getUsersFromServer, getCommentsFromServer,
} from './api';
import postsReducer, { setPostsAC } from './postsReducer';
import loadingReducer, { setLoadingAC } from './loadingReducer';
import loadedReducer, { setLoadedAC } from './loadedReducer';
import filterReducer from './filterReducer';

export const getPosts = state => state.posts;
export const getLoading = state => state.loading;
export const getLoaded = state => state.loaded;
export const getFilter = state => state.filter;

export const loadPostsFromServer = () => async(dispatch) => {
  dispatch(setLoadingAC(true));

  const [postsFromServer,
    usersFromServer,
    commentsFromServer] = await Promise.all(
    [getPostsFromServer(), getUsersFromServer(), getCommentsFromServer()]
  );

  const preparedPosts = postsFromServer.map((post) => {
    const user = usersFromServer.find(item => item.id === post.userId);
    const comments = commentsFromServer
      .filter(comment => comment.postId === post.id);

    return {
      ...post, user, comments,
    };
  });

  dispatch(setPostsAC(preparedPosts));
  dispatch(setLoadedAC(true));
  dispatch(setLoadingAC(false));
};

const rootReducer = combineReducers({
  posts: postsReducer,
  loading: loadingReducer,
  loaded: loadedReducer,
  filter: filterReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
