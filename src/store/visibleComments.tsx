import { AnyAction } from 'redux';

const VISIBLE_COMMENTS = 'VISIBLE_COMMENTS';

export const changeVisibleOfComments = (visibleComments: boolean) => ({ type: VISIBLE_COMMENTS, visibleComments});

const reducer = (visibleComments = true, action: AnyAction) => {
  switch (action.type) {
    case VISIBLE_COMMENTS:
      return action.visibleComments;

    default:
      return visibleComments;
  }
};

export default reducer;
