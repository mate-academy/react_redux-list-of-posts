import { AnyAction } from 'redux';
import  { COMMENT, POST } from '../type';

// Action types
const SET_POSTS_DETAILS = 'SET_POSTS_DETAILS';
const SET_COMMENTS = 'SET_COMMENTS';
const SET_COMMENT_ID = 'SET_COMMENT_ID';
const SET_POST_DETAILS_ERROR_TEXT = 'SET_POST_DETAILS_ERROR_TEXT'

// Action creators
export const setPostDetails = (post: POST) => ({ type: SET_POSTS_DETAILS, payload: post });
export const setComments = (comments: COMMENT[]) => ({ type: SET_COMMENTS, payload: comments });
export const setCommentID = (commentId: number) => ({ type: SET_COMMENT_ID, payload: commentId });
export const setErrorTextOnDetails = (error: boolean) => ({ type: SET_POST_DETAILS_ERROR_TEXT, error: error });

// message reducer receives only the `state.message` part, but not the entire Redux state
export type PostDetailsState = {
  post: POST | {};
  comments: COMMENT [] | [],
  commentId: number,
  errorPostDetails: boolean;
};

const initialState: PostDetailsState = {
  post: {},
  comments: [],
  commentId: 0,
  errorPostDetails: true,
}

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS_DETAILS:
      return { 
        ...state,
        post: action.payload
      };

    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };

    case SET_COMMENT_ID:
      return {
        ...state,
        commentId: action.payload,
      };

    case SET_POST_DETAILS_ERROR_TEXT:
      return {
        ...state,
        errorPostDetails: action.error,
      }
  
    default:
      return state;
  }
};

export default reducer;
