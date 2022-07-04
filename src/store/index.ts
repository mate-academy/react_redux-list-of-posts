import {
  createStore,
  combineReducers,
  applyMiddleware,
  AnyAction,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';
import { getUserPosts } from '../api/posts';
import { usersReducer } from './users';
import { postsReducer, actions as postsActions } from './posts';
import { setIsLoad, isLoadReducer } from './isLoad';
import { userIdReducer } from './userId';
import { postIdReducer } from './postId';
import { postDetailsReducer } from './postDetails';
import { commentsReducer } from './comments';
import { queryReducer } from './query';

export const selectors = {
  getQuery: (state: RootState) => state.query,
  getUserId: (state: RootState) => state.userId,
  getUsers: (state: RootState) => state.users,
  getPosts: (state: RootState) => state.posts,
  getIsload: (state: RootState) => state.isLoad,
  getPostId: (state: RootState) => state.postId,
  getPost: (state: RootState) => state.postDetails,
  getComments: (state: RootState) => state.comments,
};

export const actions = {
  loadPosts: (id: number) => (dispatch: Dispatch<AnyAction>) => {
    getUserPosts(id)
      .then((res) => dispatch(postsActions.setPosts(res)))
      .then(() => dispatch(setIsLoad(false)));
  },
};

const reducer = combineReducers({
  query: queryReducer,
  userId: userIdReducer,
  postId: postIdReducer,
  postDetails: postDetailsReducer,
  users: usersReducer,
  posts: postsReducer,
  isLoad: isLoadReducer,
  comments: commentsReducer,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
