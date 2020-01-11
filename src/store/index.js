import { createStore, combineReducers, applyMiddleware } from 'redux';
import isLoadedReducer, { setIsLoaded } from './isLoaded';
import loadingReducer, { setIsLoading } from './loading';
import postReducer, { setPosts } from './post';
import getDataFromServer from '../api/GetDataFromServer';
import thunk from 'redux-thunk';

export const loadPosts = () => async (dispatch) => {
    dispatch(setIsLoading(true));
    const [allUsers, allComments, allPosts]
      = await Promise.all([
    getDataFromServer('https://jsonplaceholder.typicode.com/users'),
    getDataFromServer('https://jsonplaceholder.typicode.com/comments'),
    getDataFromServer('https://jsonplaceholder.typicode.com/posts'),
    ]);

    dispatch(setIsLoading(true));
    const unitedPost = allPosts.map(post => ({
      ...post,
      user: allUsers.find(user => user.id === post.userId),
      comments: allComments.filter(commentId => commentId.postId === post.id),
    }));

    dispatch(setPosts(unitedPost));
    dispatch(setIsLoading(false));
    dispatch(setIsLoaded(true));
  }

const rootReducer = combineReducers({
  isLoaded: isLoadedReducer,
  loading: loadingReducer,
  post: postReducer,
});

export const removePost = (ownpost, post) => dispatch => {
  dispatch (setPosts(post.filter(post => post.id !== ownpost.id)));
}

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
