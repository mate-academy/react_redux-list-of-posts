import { AnyAction } from 'redux';

const SET_SELECTED_POST_ID = 'SET_SELECTED_POST_ID';
const SET_POST_DETAILS = 'SET_POST_DETAILS';
const SET_COMMENTS = 'SET_COMMENTS';

export type CommentsState = {
  selectedPostId: number;
  postDetails: Post | undefined;
  postComments: Comments[];
};

const initialState: CommentsState = {
  selectedPostId: 0,
  postDetails: undefined,
  postComments: [],
};

export const selectors = {
  getSelectedPostId: (state: CommentsState) => state.selectedPostId,
  getPostDetails: (state: CommentsState) => state.postDetails,
  getPostComments: (state: CommentsState) => state.postComments,
};

export const actions = {
  setSelectPostId: (selectedPostId: number) => (
    { type: SET_SELECTED_POST_ID, selectedPostId }),
  setPostComments: (postComments: Comments[]) => (
    { type: SET_COMMENTS, postComments }),
  setPostDetails: (postDetails: Post | undefined) => (
    { type: SET_POST_DETAILS, postDetails }),
};

const commentsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_SELECTED_POST_ID:
      return { ...state, selectedPostId: action.selectedPostId };
    case SET_POST_DETAILS:
      return { ...state, postDetails: action.postDetails };
    case SET_COMMENTS:
      return { ...state, postComments: action.postComments };
    default:
      return state;
  }
};

export default commentsReducer;
