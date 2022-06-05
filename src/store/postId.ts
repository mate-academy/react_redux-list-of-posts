// Action types
const SET_POST_ID = 'SET_POST_ID';

// Action creators
export type SetPostIdAction = {
  type: string,
  postId: number,
};

export const setPostId = (postId: number) => ({ type: SET_POST_ID, postId });

const reducer = (postId = null, action: SetPostIdAction) => {
  switch (action.type) {
    case SET_POST_ID: {
      if (postId === action.postId) {
        return null;
      }

      return action.postId;
    }

    default:
      return postId;
  }
};

export default reducer;
