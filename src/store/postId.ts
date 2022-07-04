import { AnyAction } from 'redux';

const POST_ID = 'POST_ID';

export const setPostId = (postId: number) => ({ type: POST_ID, postId });

export const postIdReducer = (postId = 0, action: AnyAction) => {
  switch (action.type) {
    case POST_ID:
      return action.postId;
    default:
      return postId;
  }
};
