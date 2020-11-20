import { AnyAction } from 'redux';

const POST_ID_CHECK = 'POST_ID_CHECK';

export const setPostIdCheck = (postIdCheck: boolean) => ({ type: POST_ID_CHECK, postIdCheck });

const reducer = (postIdCheck = false, action: AnyAction) => {
  switch (action.type) {
    case POST_ID_CHECK:
      return action.postIdCheck;

    default:
      return postIdCheck;
  }
};

export default reducer;
