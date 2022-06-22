import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import loadingReducer, { finishLoading, startLoading } from './loading';
import postsReducer, { setPosts } from './posts';
import postIdReducer, { setPostId } from './postId';
import postReducer, { setPost } from './post';
import usersReducer, { setUsers } from './users';
import userIdReducer from './userId';
import commentsReducer, { setComments } from './comments';
import hidingReducer from './hideComments';
import { getUserPosts, deletePost, getPostDetails } from '../helpers/posts';
import { getAllUsers } from '../helpers/users';
import {
  deleteComment,
  getPostComments,
  postNewComment,
} from '../helpers/comments';

const rootReducer = combineReducers({
  loading: loadingReducer,
  posts: postsReducer,
  postId: postIdReducer,
  post: postReducer,
  users: usersReducer,
  userId: userIdReducer,
  comments: commentsReducer,
  hiding: hidingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const isLoading = (state: RootState) => state.loading;
export const getPosts = (state: RootState) => state.posts;
export const getPostId = (state: RootState) => state.postId;
export const getPost = (state: RootState) => state.post;
export const getUsers = (state: RootState) => state.users;
export const getUserId = (state: RootState) => state.userId;
export const getComments = (state: RootState) => state.comments;
export const isHiding = (state: RootState) => state.hiding;

export const loadPosts = (userId?: number) => {
  return async (dispatch: Dispatch<unknown>) => {
    dispatch(startLoading());

    try {
      const posts = await getUserPosts(userId);

      dispatch(setPosts(posts));
    } catch (error) {
      dispatch(setPosts([]));
    }

    dispatch(finishLoading());
  };
};

export const loadPost = (postId: number) => {
  return async (dispatch: Dispatch<unknown>) => {
    dispatch(startLoading());

    try {
      const post = await getPostDetails(postId);

      dispatch(setPost(post));
    } catch (error) {
      dispatch(setPost({
        id: 0,
        userId: 0,
        title: '',
        body: '',
      }));
    }

    dispatch(finishLoading());
  };
};

export const loadUsers = () => {
  return async (dispatch: Dispatch<unknown>) => {
    dispatch(startLoading());

    try {
      const users = await getAllUsers();

      dispatch(setUsers(users));
    } catch (error) {
      dispatch(setUsers([]));
    }

    dispatch(finishLoading());
  };
};

export const loadComments = (postId: number) => {
  return async (dispatch: Dispatch<unknown>) => {
    dispatch(startLoading());

    try {
      const comments = await getPostComments(postId);

      dispatch(setComments(comments));
    } catch (error) {
      dispatch(setComments([]));
    }

    dispatch(finishLoading());
  };
};

export const removePost = (postId: number) => {
  return async (dispatch: Dispatch<unknown>) => {
    try {
      await deletePost(postId);

      const allPosts = await getUserPosts();

      dispatch(setPosts(allPosts));
    } catch {
      dispatch(setPosts([]));
    }
  };
};

export const removeComment = (commentId: number, postId: number) => {
  return async (dispatch: Dispatch<unknown>) => {
    try {
      await deleteComment(commentId);

      const allComments = await getPostComments(postId);

      dispatch(setComments(allComments));
    } catch {
      dispatch(setComments([]));
    }
  };
};

export const createComment = (form: NewComment) => {
  return async (dispatch: Dispatch<unknown>) => {
    try {
      await postNewComment(form);

      const allComments = await getPostComments(form.postId);

      dispatch(setComments(allComments));
    } catch {
      dispatch(setComments([]));
    }
  };
};

export const resetPostDetail = () => {
  return (dispatch: Dispatch<unknown>) => {
    dispatch(setPost({
      id: 0,
      userId: 0,
      title: '',
      body: '',
    }));
    dispatch(setPostId(0));
    dispatch(setComments([]));
  };
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
