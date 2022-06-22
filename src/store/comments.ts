import { AnyAction } from 'redux';

const SET_COMMENTS = 'SET_COMMENTS';

export const setComments = (comments: Comments[]) => ({
  type: SET_COMMENTS,
  comments,
});

const reducer = (comments = [], action: AnyAction) => {
  switch (action.type) {
    case SET_COMMENTS:
      return action.comments;

    default:
      return comments;
  }
};

export default reducer;
