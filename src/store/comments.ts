import { AnyAction } from 'redux';
import { Comment } from '../types/coment';

const SET_COMMENTS = 'SET_COMMENTS';
const SET_LOAD_COMMENTS_ERROR = 'SET_LOAD_COMMENTS_ERROR';

export type CommentsState = {
  comments: Comment[],
  loadCommentsError: boolean,
};

const initialState: CommentsState = {
  comments: [],
  loadCommentsError: false,
};

export const selectors = {
  getComments: (state: CommentsState) => state.comments,
  getLoadCommentsError: (state: CommentsState) => state.loadCommentsError,
};

export const actions = {
  setComments: (comments: Comment[]) => ({ type: SET_COMMENTS, comments }),
  setLoadCommentsError: () => ({ type: SET_LOAD_COMMENTS_ERROR }),
};

const commentsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.comments,
      };

    case SET_LOAD_COMMENTS_ERROR:
      return {
        ...state,
        loadCommentsError: true,
      };

    default:
      return state;
  }
};

export default commentsReducer;
