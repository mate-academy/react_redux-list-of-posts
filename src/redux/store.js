import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { fetchPostsFromServer } from '../apiFetch';
import postsReducer, { setPosts } from './postsReducer';
import loadingReducer, { setLoading } from './loadingReducer';
import queryreducer from './queryReducer';
import errorReducer, { setError } from './errorReducer';
import initialisedReducer, { setInitialized } from './initializedReducer';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments';

export const getPosts = state => state.posts
  .filter(post => (post.title + post.body).toLowerCase().includes(state.query));
export const getError = state => state.error;
export const getLoading = state => state.isLoading;
export const getInitialized = state => state.isInitialized;

const getPostsWithUsersAndComments = (posts, users, comments) => (
  posts.map(post => ({
    ...post,
    user:users.find(user => user.id === post.userId),
    comments:comments.filter(comment => comment.postId === post.id)
  }))
);

export const getPostsFromServer = () => (
  async(dispatch) => {
    dispatch(setError(false));
    dispatch(setLoading(true));

    try {
      const [posts,users,comments] = await Promise
      .all([
        fetchPostsFromServer(POSTS_URL),
        fetchPostsFromServer(USERS_URL),
        fetchPostsFromServer(COMMENTS_URL),
      ]);

      dispatch(setPosts(
        getPostsWithUsersAndComments(posts,users,comments)
      ))
      dispatch(setInitialized(true));
    }catch {
      dispatch(setError(true))
    }
    dispatch(setLoading(false));
  }
)

const rootReducer = combineReducers({
  posts:postsReducer,
  isLoading:loadingReducer,
  error:errorReducer,
  query:queryreducer,
  isInitialized:initialisedReducer,
})

const store = createStore(rootReducer,applyMiddleware(thunk));

export default store;
