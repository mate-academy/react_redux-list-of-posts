// Action types
const TOGGLE_COMMENTS_VISIBILITY = 'TOGGLE_COMMENTS_VISIBILITY';

// Action creators
export type ToggleCommentsVisibilityAction = {
  type: string,
};

export const toggleVisibility = () => ({ type: TOGGLE_COMMENTS_VISIBILITY });

const reducer
  = (commentsVisibility = false, action: ToggleCommentsVisibilityAction) => {
    switch (action.type) {
      case TOGGLE_COMMENTS_VISIBILITY:
        return !commentsVisibility;

      default:
        return commentsVisibility;
    }
  };

export default reducer;
