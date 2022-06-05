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
import { fetchMessage } from '../helpers/api';
import { fetchPost, fetchPosts } from '../api/posts';
import { deleteComment, fetchComments, postComment } from '../api/comments';
import { NewComment } from '../types/NewComment';
// import { setPost } from './post';

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
});

// We automatically get types returned by concrete reducers
export type RootState = ReturnType<typeof rootReducer>;
export type Action = SetUserIdAction | SetPostsAction | SetPostIdAction
| SetMessageAction | LoadingAction | SetCommentsAction;
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
    dispatch(setPosts(null));
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
