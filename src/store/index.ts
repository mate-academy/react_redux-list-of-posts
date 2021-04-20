import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import loadingReducer, { finishLoading, startLoading } from './loading';
import postLoadingReducer, { setPosts, setErrorStatus, setErrorText } from './postReducer';
import commentPostReducer, { setPostDetails, setComments, setErrorTextOnDetails } from './commentPostReducer';

import { getPosts, getUserPosts, getPostComments, getPostDetails, deletComment } from '../helpers/api';
import { POST } from '../type';

const rootReducer = combineReducers({
  loading: loadingReducer,
  posts: postLoadingReducer,
  postDetails: commentPostReducer,
});

// We automatically get types returned by concrete reducers
export type RootState = ReturnType<typeof rootReducer>;

// Selectors - a function receiving Redux state and returning some data from it
export const getServerPosts = (state: RootState ) => state.posts.posts;
export const getCommentsList = (state: RootState ) => state.postDetails.comments;
export const getPostsDetails = (state: RootState ) => state.postDetails.post;
export const getPostId = (state: RootState ) => state.posts.postId;
export const getCommentId = (state: RootState ) => state.postDetails.commentId;
export const isLoading = (state: RootState) => state.loading;
export const isErrorPost = (state: RootState) => state.posts.isErrorPost;
export const getErrorText = (state: RootState) => state.posts.errorText;
export const isErrorTextPostDetails = (state: RootState ) => state.postDetails.errorPostDetails;

export const loadPosts = () => {
  // inner function is an action handled by Redux Thunk
  return async (dispatch: Dispatch<any>) => {
    dispatch(startLoading());

    try {
      const posts: POST[] = await getPosts();
      dispatch(setErrorStatus(false));
      dispatch(setPosts(posts));
    } catch (error) {
      dispatch(setErrorStatus(true));
      dispatch(setErrorText(error.message));     
    }

    dispatch(finishLoading());
  };
};

export const loadPostsbyUser = (userId: number) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const posts: POST[] = await getUserPosts(userId);
      dispatch(setErrorStatus(false));
      dispatch(setPosts(posts));
    } catch (error) {
      dispatch(setErrorStatus(true));
      dispatch(setErrorText(error.message));     
    }

    dispatch(finishLoading());
  };
};

export const loadPostDetails = (postId: number) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      Promise.all([getPostComments(postId), getPostDetails(postId)])
      .then((result) => {

        dispatch(setErrorTextOnDetails(false));   
        dispatch(setPostDetails(result[1]));
        dispatch(setComments(result[0]));
      })
    } catch (error) {
      console.log(error.message);
      dispatch(setErrorTextOnDetails(true));    
    }
  };
}

export const reLoadpostDetails = (commentId: number, postId: number ) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      await deletComment(commentId);
      const comments = await getPostComments(postId);
      dispatch(setComments(comments));
    } catch (error) {
      console.log(error.message)
    }
  }
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
