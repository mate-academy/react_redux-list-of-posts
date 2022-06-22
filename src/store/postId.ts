import { AnyAction } from 'redux';

const SET_POST_ID = 'SET_POST_ID';

export const setPostId = (postId: number) => ({ type: SET_POST_ID, postId });

const reducer = (postId = 0, action: AnyAction) => {
  switch (action.type) {
    case SET_POST_ID:
      return action.postId;

    default:
      return postId;
  }
};

export default reducer;
