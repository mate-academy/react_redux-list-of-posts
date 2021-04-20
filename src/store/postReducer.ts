import { AnyAction } from 'redux';
import  { POST } from '../type';

// Action types
const SET_POSTS = 'SET_POSTS';
const SET_POST_ERROR_STATE = 'SET_POST_ERROR_STATE';
const SET_POST_ERROR_TEXT = 'SET_POST_ERROR_TEXT';
const SET_POST_ID = 'SET_POST_ID';

// Action creators
export const setPosts = (posts: POST[]) => ({ type: SET_POSTS, payload: posts });
export const setPostID = (postId: number) => ({ type: SET_POST_ID, payload: postId });
export const setErrorStatus = (error: boolean) => ({ type: SET_POST_ERROR_STATE, error });
export const setErrorText = (error: string) => ({ type: SET_POST_ERROR_TEXT, error });

// message reducer receives only the `state.message` part, but not the entire Redux state
export type PostState = {
  posts: POST[]|[];
  isErrorPost: boolean,
  errorText: string,
  postId: number;
  userId: number;
};

const initialState: PostState = {
  posts: [],
  isErrorPost: true,
  errorText: '',
  postId: 0,
  userId: 0,
}

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_POSTS:
      return { 
        ...state,
        posts: action.payload
      };

    case SET_POST_ERROR_STATE:
      return {
        ...state,
        isErrorPost: action.error,
      };

    case SET_POST_ERROR_TEXT:
      return {
        ...state,
        errorText: action.error,
      };
    
    case SET_POST_ID:
      return {
        ...state,
        postId: action.payload,
      };
  
    default:
      return state;
  }
};

export default reducer;
