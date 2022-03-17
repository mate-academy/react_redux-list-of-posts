import { PostCommentsState, PostCommentsAction, PostCommentsTypes } from '../types/postComments';

const initialState: PostCommentsState = {
  postComments: [],
  loading: false,
  error: null,
};

export const PostCommentsReducer = (state = initialState, action: PostCommentsAction) => {
  switch (action.type) {
    case PostCommentsTypes.FETCH_POST_COMMENTS:
      return {
        ...state,
        loading: true,
      };

    case PostCommentsTypes.FETCH_POST_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        postComments: [...action.payload],
      };

    case PostCommentsTypes.FETCH_POST_COMMENTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
