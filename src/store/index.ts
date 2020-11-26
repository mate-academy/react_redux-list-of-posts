import { createStore, combineReducers, applyMiddleware, Dispatch } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import loadingReducer, { finishLoading, startLoading } from './loading';
import { fetchPostDetails, fetchUserPosts } from '../helpers/api';
import userPostsReducer, { setUserPosts } from './userPosts';
import userIdReducer, { chooseUserId } from './userId';
import postIdReducer from './postId';
import postIdCheckReducer from './postIdCheck';
import visibleCommentsReducer from './visibleComments';
import newPostReducer, { addPost } from './addPost';
import newCommentReducer, { addComment } from './addComment';
import inputChangeReducer from './inputChange';
import commentFieldsReducer from './resetComment';
import { addPostComment, getPostComments, removePostComment } from '../helpers/comments';

const rootReducer = combineReducers({
  loading: loadingReducer,
  userPosts: userPostsReducer,
  userId: userIdReducer,
  postIdCheck: postIdCheckReducer,
  postId: postIdReducer,
  visibleComments: visibleCommentsReducer,
  newPost: newPostReducer,
  newComment: newCommentReducer,
  inputChange: inputChangeReducer,
  commentFields: commentFieldsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const getPosts = (state: RootState) => {
  if (!state.userId) {
    return [...state.userPosts].filter(post => post.title !== null && post.title.toLowerCase()
    .includes(state.inputChange.toLowerCase()))
  } else {
    return [...state.userPosts].filter(post => post.userId !== null && post.userId === state.userId && post.title.toLowerCase()
    .includes(state.inputChange.toLowerCase()));
  }
};

export const fetchPosts = (paramsOfData: number) => {
  return async(dispatch: Dispatch<any>) => { 
    dispatch(startLoading());

    const posts = await fetchUserPosts(paramsOfData);
    dispatch(setUserPosts(posts));
    dispatch(chooseUserId(paramsOfData));
    dispatch(finishLoading());
  }
}

export const fetchDetailsOfPost = (paramsOfData: number) => {
  return async(dispatch: Dispatch<any>) => { 
    const posts = await fetchPostDetails(paramsOfData);
    dispatch(addPost(posts));
    const comment = await getPostComments(paramsOfData);
    dispatch(addComment(comment));
  }
}

export const removeComment = (commentId: number, postId: number) => {
  return async (dispatch: Dispatch<any>) => {
    removePostComment(commentId)
    .then(() => getPostComments(postId))
    .then(result => dispatch(addComment(result)));
  }
}

export const commentsUpdate = (newComment: {}, postId: number) => {
  return async (dispatch: Dispatch<any>) => {
    addPostComment(newComment)
    .then(() => getPostComments(postId))
    .then(result => dispatch(addComment(result)));
  }
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
