import { AnyAction } from 'redux';


const SET_ERROR = 'SET_ERROR';

export const setError = (errorMessage: string) => ({ type: SET_ERROR, errorMessage });

const reducer = (errorMessage = '', action: AnyAction) => {
  switch (action.type) {
    case SET_ERROR:
      return action.errorMessage;

    default:
      return errorMessage;
  }
};

export default reducer;
