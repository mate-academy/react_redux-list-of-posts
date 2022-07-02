import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Dispatch } from 'react';

import loadingReducer, {
  finishLoading,
  LoadingAction,
  startLoading,
} from './loading';
import messageReducer, { setMessage, SetMessageAction } from './message';
import userReducer, { SetUserIdAction } from './user';
import posIdtReducer, { SetPostIdAction } from './postId';
import commentsVisibilityReducer from './commentsVisibility';
import postsReducer, { setPosts, SetPostsAction } from './posts';
import commentsReducer, { setComments, SetCommentsAction } from './comments';
import postReducer, { setPost } from './post';
import queryReducer, { SetQueryAction } from './query';

import { fetchMessage } from '../helpers/api';
import { fetchPost, fetchPosts } from '../api/posts';
import { deleteComment, fetchComments, postComment } from '../api/comments';
import { NewComment } from '../types/NewComment';
import { Post } from '../types/Post';
import { Comment } from '../types/Comment';

/**
 * Each concrete reducer will receive all the actions but only its part of the state
 *
 * const rootReducer = (state = {}, action) => ({
 *   loading: loadingReducer(state.loading, action),
 *   message: messageReducer(state.message, action),
 * })
 */
const rootReducer = combineReducers({
  loading: loadingReducer,
  message: messageReducer,
  userId: userReducer,
  postId: posIdtReducer,
  posts: postsReducer,
  comments: commentsReducer,
  post: postReducer,
  commentsVisibility: commentsVisibilityReducer,
  query: queryReducer,
});

export type RootState = {
  loading: boolean,
  message: string,
  userId: string,
  postId: number,
  posts: Post[],
  displayedPosts: Post[],
  comments: Comment[],
  post: Post,
  commentsVisibility: boolean,
  query: string,
};
export type Action = SetUserIdAction | SetPostsAction | SetPostIdAction
| SetMessageAction | LoadingAction | SetCommentsAction | SetQueryAction;
/**
 * Thunk - is a function that should be used as a normal action creator
 *
 * dispatch(loadMessage())
 */
export const loadMessage = () => {
  // inner function is an action handled by Redux Thunk
  return async (dispatch: Dispatch<Action>) => {
    dispatch(startLoading());

    try {
      const message = await fetchMessage();

      dispatch(setMessage(message));
    } catch (error) {
      dispatch(setMessage('Error occurred when loading data'));
    }

    dispatch(finishLoading());
  };
};

export const loadPosts = (userId: number) => {
  // inner function is an action handled by Redux Thunk
  return async (dispatch: Dispatch<Action>) => {
    dispatch(setPosts([]));
    dispatch(startLoading());

    try {
      const posts = await fetchPosts(userId);

      dispatch(setPosts(posts));
    } catch (error) {
      dispatch(setPosts([]));
      dispatch(setMessage('Error occurred when loading data'));
    }

    dispatch(finishLoading());
  };
};

export const loadPostDetails = (postId: number) => {
  // inner function is an action handled by Redux Thunk
  return async (dispatch: Dispatch<Action>) => {
    if (postId) {
      dispatch(startLoading());
      dispatch(setPost(null));
      dispatch(setComments(null));

      try {
        const [post, comments] = await Promise.all([
          fetchPost(postId),
          fetchComments(postId),
        ]);

        dispatch(setPost(post));
        dispatch(setComments(comments));
      } catch (error) {
        dispatch(setMessage('Error occurred when loading post'));
        dispatch(finishLoading());
      }

      dispatch(finishLoading());
    }
  };
};

// delete comments not used so as not to torment the training server
export const handleComment
  = (comment: NewComment | number, selectedPostId: number | null) => {
    return async (dispatch: Dispatch<Action>) => {
      dispatch(startLoading());
      dispatch(setComments(null));

      try {
        if (typeof comment === 'number') {
          await deleteComment(comment);
        } else {
          await postComment(comment);
        }

        if (selectedPostId) {
          const updatedComments = await fetchComments(selectedPostId);

          dispatch(setComments(updatedComments));
        }
      } catch (error) {
        dispatch(setMessage('Error occurred when removing comment'));
      }

      dispatch(finishLoading());
    };
  };

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
