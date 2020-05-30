import { AnyAction } from 'redux';

const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

export const setErrorMessage = (errorMessage: string) => ({
  type: SET_ERROR_MESSAGE,
  errorMessage,
});

const reducer = (errorMessage = '', action: AnyAction) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return action.errorMessage;

    default:
      return errorMessage;
  }
};

export default reducer;
