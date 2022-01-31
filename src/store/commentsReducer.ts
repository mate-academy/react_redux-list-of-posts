import { AnyAction } from 'redux';
import { Comment } from '../types/Comment';
import { Post } from '../types/Post';

type State = {
  comments: Post[],
};

const defaultState: State = {
  comments: [],
};

const FETCH_COMMENTS = 'FETCH_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';
const REMOVE_COMMENT = 'REMOVE_COMMENT';

export const commentsReducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_COMMENTS:
      return {
        ...state,
        comments: [...action.payload],
      };

    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };

    case REMOVE_COMMENT:
      return {
        ...state,
        comments: [...state.comments.filter(comment => comment.id !== action.payload)],
      };

    default:
      return state;
  }
};

export const fetchCommentsAction = (payload: Comment[]) => ({ type: FETCH_COMMENTS, payload });
export const addCommentAction = (payload: Comment) => ({ type: ADD_COMMENT, payload });
export const removeCommentAction = (payload: string) => ({ type: REMOVE_COMMENT, payload });
