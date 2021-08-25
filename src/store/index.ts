import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import postsReducer from "./posts";
import postReducer from "./post";

const rootReducer = combineReducers({
  posts: postsReducer,
  post: postReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export const getPostsSelector = (state: RootState) => state.posts.posts;
export const getActivePostId = (state: RootState) => state.posts.postId;
export const getActiveUserId = (state: RootState) => state.posts.userId;
export const getPost = (state: RootState) => state.post.post;
export const getComments = (state: RootState) => state.post.comments;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
