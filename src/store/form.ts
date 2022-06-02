import { AnyAction } from 'redux';
import { FormState, State } from './storeTypes';

const ADD_USER_NAME = 'ADD_USER_NAME';
const ADD_USER_EMAIL = 'ADD_USER_EMAIL';
const CREATE_COMMENT = 'CREATE_COMMENT';
const GET_USER_ERROR = 'GET_USER_ERROR';
const GET_EMAIL_ERROR = 'GET_EMAIL_ERROR';
const GET_COMMENT_ERROR = 'GET_COMMENT_ERROR';

export const actionsForm = {
  addUserName: (name: string) => ({ type: ADD_USER_NAME, name }),
  addUserEmail: (email: string) => ({ type: ADD_USER_EMAIL, email }),
  createComment: (comment: string) => ({ type: CREATE_COMMENT, comment }),
  getUserError: (error: string | null) => ({ type: GET_USER_ERROR, error }),
  getEmailError: (error: string | null) => ({ type: GET_EMAIL_ERROR, error }),
  getCommentError: (error: string | null) => (
    { type: GET_COMMENT_ERROR, error }
  ),
};

export const selectorsForm = {
  userNameSelector: (state: State) => state.formState.userName,
  userEmailSelector: (state: State) => state.formState.userEmail,
  newCommentSelector: (state: State) => state.formState.newComment,
  userErrorSelector: (state: State) => state.formState.userError,
  emailErrorSelector: (state: State) => state.formState.emailError,
  commentErrorSelector: (state: State) => state.formState.commentError,
};

const formInitialState: FormState = {
  userName: '',
  userEmail: '',
  newComment: '',
  userError: null,
  emailError: null,
  commentError: null,
};

const formReducer = (formState = formInitialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_USER_NAME:
      return {
        ...formState,
        userName: action.name,
      };

    case ADD_USER_EMAIL:
      return {
        ...formState,
        userEmail: action.email,
      };

    case CREATE_COMMENT:
      return {
        ...formState,
        newComment: action.comment,
      };

    case GET_USER_ERROR:
      return {
        ...formState,
        userError: action.error,
      };

    case GET_EMAIL_ERROR:
      return {
        ...formState,
        emailError: action.error,
      };

    case GET_COMMENT_ERROR:
      return {
        ...formState,
        commentError: action.error,
      };

    default:
      return formState;
  }
};

export default formReducer;
