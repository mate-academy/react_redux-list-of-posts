import { applyMiddleware, createStore, Dispatch } from 'redux';
import thunk from 'redux-thunk';
import { initialState, reducer } from './rootReducer';
import {
  deleteComment,
  setError,
  setLoading,
  setPosts,
} from './actionCreators';
import { getPostsWithUserAndComments } from '../utils';
import { composeEnhancers } from './composeEnhancer';

// thunk
export const loadData = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setError(false));
      dispatch(setLoading(true));
      const filteredPosts = await getPostsWithUserAndComments();

      dispatch(setPosts(filteredPosts));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);

      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const deleteCommentThunk = (id: number) => (dispatch: Dispatch) => {
  dispatch(deleteComment(id));
};

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(
  reducer,
  initialState,
  enhancer,
);
