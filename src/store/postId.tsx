import { AnyAction } from 'redux';

const CHOOSE_POST_ID = 'CHOOSE_POST_ID';

export const choosePostId = (postId: number) => ({ type: CHOOSE_POST_ID, postId});

const reducer = (postId = 0, action: AnyAction) => {
  switch (action.type) {
    case CHOOSE_POST_ID:
      return action.postId;

    default:
      return postId;
  }
};

export default reducer;
