import { AnyAction } from 'redux';

const HIDE_COMMENTS = 'HIDE_COMMENTS';

export const hideComments = () => ({ type: HIDE_COMMENTS });

const reducer = (hiding = false, action: AnyAction) => {
  switch (action.type) {
    case HIDE_COMMENTS:
      return !hiding;

    default:
      return hiding;
  }
};

export default reducer;
