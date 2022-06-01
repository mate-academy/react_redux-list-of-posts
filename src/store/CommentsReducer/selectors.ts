import { State } from '..';

export const getIsDeleteCommentLoadingSelector = (state: State) => {
  return state.CommentsReducer.isDeleteCommentLoading;
};

export const getDeleteTargets = (state: State) => {
  return state.CommentsReducer.deleteTargets;
};

export const getIsCommentsVisibleSelector = (state: State) => {
  return state.CommentsReducer.isCommentsVisible;
};

export const getSelectedPostCommentsSelector = (state: State) => {
  return state.CommentsReducer.selectedPostComments;
};

export const getInputNameSelector = (state: State) => {
  return state.CommentsReducer.inputName;
};

export const getInputEmailSelector = (state: State) => {
  return state.CommentsReducer.inputEmail;
};

export const getInputCommentSelector = (state: State) => {
  return state.CommentsReducer.inputComment;
};

export const getIsEmailValidSelector = (state: State) => {
  return state.CommentsReducer.isEmailValid;
};

export const getIsSubmittedSelector = (state: State) => {
  return state.CommentsReducer.isSubmitted;
};

export const getIsAddCommentsLoadingSelector = (state: State) => {
  return state.CommentsReducer.isAddCommentLoading;
};
