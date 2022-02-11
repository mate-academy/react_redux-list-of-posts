import { AnyAction } from 'redux';
// Action types
const SET_COMMENTS = 'SET_COMMENTS';

// Action creators
export const setComments = (posts: Post[]) => ({ type: SET_COMMENTS, payload: posts });

const initialState: CommentsSlice = {
  comments: [],
};

const commentsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };

    default:
      return state;
  }
};

export default commentsReducer;
