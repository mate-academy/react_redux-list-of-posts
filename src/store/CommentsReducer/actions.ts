export const SET_IS_COMMENTS_VISIBLE = 'SET_IS_COMMENTS_VISIBLE';
export const SET_IS_DELETE_COMMENTS_LOADING = 'SET_IS_DELETE_COMMENTS_LOADING';
export const SET_DELETE_TARGETS = 'SET_DELETE_TARGETS';
export const SET_SELECTED_POST_COMMENTS = 'SET_SELECTED_POST_COMMENTS';
export const SET_INPUT_NAME = 'SET_INPUT_NAME';
export const SET_INPUT_EMAIL = 'SET_INPUT_EMAIL';
export const SET_INPUT_COMMENT = 'SET_INPUT_COMMENT';
export const SET_IS_EMAIL_VALID = 'SET_IS_EMAIL_VALID';
export const SET_IS_SUBMITTED = 'SET_IS_SUBMITTED';
export const SET_IS_ADD_COMMENT_LOADING = 'SET_IS_ADD_COMMENT_LOADING';

export const setSelectedPostCommentsAction = (comments: Comment[]) => {
  return ({
    type: SET_SELECTED_POST_COMMENTS,
    selectedPostComments: comments,
  });
};

export const setIsCommentsVisibleAction = (boolean: boolean) => {
  return ({
    type: SET_IS_COMMENTS_VISIBLE,
    isCommentsVisible: boolean,
  });
};

export const setIsDeleteCommentLoadingAction = (boolean: boolean) => {
  return ({
    type: SET_IS_DELETE_COMMENTS_LOADING,
    isDeleteCommentLoading: boolean,
  });
};

export const setDeleteTargetsAction = (id: number, boolean: boolean) => {
  return ({
    type: SET_DELETE_TARGETS,
    deleteTargets: id,
    push: boolean,
  });
};

export const setInputNameAction = (value: string) => {
  return ({
    type: SET_INPUT_NAME,
    inputName: value,
  });
};

export const setInputEmailAction = (value: string) => {
  return ({
    type: SET_INPUT_EMAIL,
    inputEmail: value,
  });
};

export const setInputCommentAction = (value: string) => {
  return ({
    type: SET_INPUT_COMMENT,
    inputComment: value,
  });
};

export const setIsEmailValidAction = (value: boolean) => {
  return ({
    type: SET_IS_EMAIL_VALID,
    isEmailValid: value,
  });
};

export const setIsSubmittedAction = (value: boolean) => {
  return ({
    type: SET_IS_SUBMITTED,
    isSubmitted: value,
  });
};

export const setIsAddCommentLoadingAction = (value: boolean) => {
  return ({
    type: SET_IS_ADD_COMMENT_LOADING,
    isAddCommentLoading: value,
  });
};
