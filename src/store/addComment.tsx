import { AnyAction } from 'redux';

const ADD_COMMENT = 'ADD_COMMENT';

export const addComment = (newComment: {}) => ({ type: ADD_COMMENT, newComment});

const reducer = (newComment = {}, action: AnyAction) => {
  switch (action.type) {
    case ADD_COMMENT:
      return action.newComment;

    default:
      return newComment;
  }
};

export default reducer;
