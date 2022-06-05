import { AnyAction } from 'redux';

// Action types
const TOGGLE_COMMENTS_VISIBILITY = 'TOGGLE_COMMENTS_VISIBILITY';

// Action creators
export const toggleVisibility = () => ({ type: TOGGLE_COMMENTS_VISIBILITY });

const reducer = (commentsVisibility = false, action: AnyAction) => {
  switch (action.type) {
    case TOGGLE_COMMENTS_VISIBILITY:
      return !commentsVisibility;

    default:
      return commentsVisibility;
  }
};

export default reducer;
