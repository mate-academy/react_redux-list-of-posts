import { AnyAction, Dispatch } from 'redux';
import { getPostDetails } from '../api/posts';

const POST_DETAILS = 'POST_DETAILS';

export const actions = {
  setPostDetails: (postDetails: Post) => ({ type: POST_DETAILS, postDetails }),
  loadPostDetails: (id: number) => (dispatch: Dispatch<AnyAction>) => {
    getPostDetails(id).then((res) => dispatch(actions.setPostDetails(res)));
  },
};

export const postDetailsReducer = (postDetails = null, action: AnyAction) => {
  switch (action.type) {
    case POST_DETAILS:
      return action.postDetails;
    default:
      return postDetails;
  }
};
