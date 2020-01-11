import { createStore, combineReducers, applyMiddleware } from 'redux';
import isLoadedReducer, { setIsLoaded } from './isLoaded';
import loadingReducer, { setIsLoading } from './loading';
import postReducer, { setPosts } from './post';
import textInputReducer, { setTextInput } from './textInput';
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
  posts: postReducer,
  textInput: textInputReducer,
});

export const removePost = (ownpost, posts) => dispatch => {
  dispatch (setPosts(posts.filter(post => post.id !== ownpost.id)));
}

const store = createStore(rootReducer, applyMiddleware(thunk));

export const filteredPost = (store) => {
  return store.posts.filter((post) => {
    const postContent = post.title + post.body;

    return postContent.includes(store.textInput);
  });
}

export default store;
